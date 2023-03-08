/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Query, UploadedFile, Headers, UseInterceptors, Body, Delete, HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthService } from 'src/services/auth/auth.service';
import { DocumentService } from 'src/services/document/document.service';
import { saveDocumentToStorage } from './documentFilter';
import * as fs from 'fs';
import { DocModel } from 'src/models/document.model';

@Controller('document')
export class DocumentController {
    constructor(private documentService: DocumentService, private authService: AuthService) { }
    @Get('')
    async getDocuments(@Headers() header, @Query('id') id, @Query('uid') uid) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);

        try {
            if (id) {
                return await this.documentService.getDocument(id);
            }
            if (uid) {
                return await this.documentService.getDocuments(uid);
            }
            return await this.documentService.getDocuments(null);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Post('/createDoc')
    async createUserDocument(@Headers() header, @Body('document') document:DocModel) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);
        try {
            return await this.documentService.createDocument(document);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    @Put('')
    async updateDocument(@Headers() header, @Body() body, @Query('id') id, @Query('uid') uid) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);

        try {
            return await this.documentService.updateDocument(id, uid, body);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }


    //file
    @Get('file')
    async getDocument(@Headers() header, @Query('path') path) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);

        try {
            const pathToImage = join(process.cwd(), 'documentsStorage', header['ownerid'], path);
            //read file json
            let file = fs.readFileSync(pathToImage, 'utf8');
            return file;

        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
   


    @Post('file')
    @UseInterceptors(FileInterceptor('file', saveDocumentToStorage))
    async createDocument(@UploadedFile() file: Express.Multer.File, @Headers() header) {
        if (!file) return "File is not valid";

        const pathToImageFolder = join('documentsStorage', header['ownerid']);
        const pathToImage = join(pathToImageFolder, file.filename);

        return {
            path: pathToImage,
            name: file.filename,
        };
    }
}
