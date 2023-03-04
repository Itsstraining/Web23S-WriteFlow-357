import { Controller, Get, Post, Put, Query, UploadedFile, Headers, UseInterceptors, Body, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { DocumentService } from 'src/services/document/document.service';
import { saveDocumentToStorage } from './documentFilter';

@Controller('document')
export class DocumentController {
    constructor(private documentService: DocumentService) { }

    //related to document info
    @Get('info')
    async getDocumentInfo(@Query('id') id: string) {
        let document = await this.documentService.findOne(id);
        return document;
    }

    @Put('info')
    async updateDocumentInfo(@Body() body: any) {
        let document = await this.documentService.findOne(body.id);
        if (!document) {
            return this.documentService.create(body);
        } else {
            return this.documentService.update(body.id, body);
        }
    }

    @Delete('info')
    async deleteDocumentInfo(@Query('id') id: string) {
        let document = await this.documentService.findOne(id);
        if (!document) {
            return "Document not found";
        } else {
            return this.documentService.remove(id);
        }
    }


    //related to user
    @Get('user')
    async getDocumentsByUser(@Query('id') id: string) {
        let documents = await this.documentService.findByOwnerId(id);
        return documents;
    }


    //related to file
    @Get('file')
    async getDocument(@Query('path') path: string) {
        let document = fs.readFileSync(join(cwd(), 'src', path), 'utf8');
        return document;
    }

    @Post('file')
    @UseInterceptors(FileInterceptor('file', saveDocumentToStorage))
    async createDocument(@UploadedFile() file: Express.Multer.File, @Headers() header) {
        if (!file) return "File is not valid";

        const pathToImageFolder = join('documentsStorage', header['ownerid']);
        const pathToImage = join(pathToImageFolder, file.filename);

        return pathToImage;
    }
}
