import { Controller, Get, Post, Put, Query, UploadedFile, Headers, UseInterceptors, Body, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthService } from 'src/services/auth/auth.service';
import { DocumentService } from 'src/services/document/document.service';
import { saveDocumentToStorage } from './documentFilter';
import * as fs from 'fs';

@Controller('document')
export class DocumentController {
    constructor(private documentService: DocumentService, private authService: AuthService) { }

    @Get('')
    async getDocuments(@Query('id') id: string, @Headers() header: any) {
        let token = header['authorization'];
        token.replace('Bearer ', '');

        let decodedToken = await this.authService.validateUser(token);
        if (!decodedToken) return "Token is not valid";

        if (id) return await this.documentService.getDocument(decodedToken.uid, id);
        return await this.documentService.getDocuments(decodedToken.uid);
    }

    @Put('')
    async updateDocument(@Body() document: any, @Headers() header: any) {
        let token = header['authorization'];
        token.replace('Bearer ', '');

        let decodedToken = await this.authService.validateUser(token);
        if (!decodedToken) return "Token is not valid";

        return await this.documentService.updateDocument(decodedToken.uid, document.id, document);
    }

    @Delete('')
    async deleteDocument(@Query('id') id: string, @Headers() header: any) {
        let token = header['authorization'];
        token.replace('Bearer ', '');

        let decodedToken = await this.authService.validateUser(token);
        if (!decodedToken) return "Token is not valid";

        if (!id) return "Id is not valid";
        return await this.documentService.deleteDocument(decodedToken.uid, id);
    }


    //file
    @Get('file')
    async getDocumentFile(@Query('id') id: string, @Headers() header: any) {
        let token = header['authorization'];
        token.replace('Bearer ', '');

        let decodedToken = await this.authService.validateUser(token);
        if (!decodedToken) return "Token is not valid";
        if (!id) return "Id is not valid";

        let document = await this.documentService.getDocument(decodedToken.uid, id);
        if (!document) return "Document is not valid";

        let pathToImage = join('documentsStorage', decodedToken.uid, document.contentPath);

        return fs.readFileSync(pathToImage);
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
