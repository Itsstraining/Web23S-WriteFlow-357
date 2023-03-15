/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Query, UploadedFile, Headers, UseInterceptors, Body, Delete, HttpException, StreamableFile } from '@nestjs/common';
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
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        try {
            if (id) {
                let document = await this.documentService.getDocument(id, decodedToken.uid);
                if (!document) {
                    throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });
                } else {
                    return document;
                }


            }
            if (uid) {
                return await this.documentService.getDocuments(uid);
            }
            return await this.documentService.getDocuments(null);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }


    @Get('public')
    async getDocumentsPublic(@Query('uid') uid) {
        return await this.documentService.getDocumentsPublic(uid);
    }


    @Get('shared')
    async getSharedDocuments(@Headers() header, @Query('uid') uid) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);
        try {
            return await this.documentService.getSharedDocumentsByUserId(uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Get('deleted')
    async getDeletedDocuments(@Headers() header, @Query('uid') uid) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);
        try {
            return await this.documentService.getDeletedDocumentsByUserId(uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Post('create')
    async createUserDocument(@Headers() header, @Body('document') document: DocModel) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        try {
            return await this.documentService.createDocument(document);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Delete('')
    async deleteDocument(@Headers() header, @Query('id') id) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        return await this.documentService.deleteDocument(id, decodedToken.uid);
    }

    @Put('')
    async updateDocument(@Headers() header, @Body('updateField') updateField, @Body('updateValue') updateValue, @Query('id') id, @Query('uid') uid) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);
        if (decodedToken.uid != uid) throw new HttpException('Unauthorized', 401);

        try {
            return await this.documentService.updateDocumentField(id, uid, updateField, updateValue);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    @Put('viewer')
    async addViewer(@Headers() header, @Body() body) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != body.uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });

        try {
            return await this.documentService.addViewer(body.id, decodedToken.uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    @Delete('viewer')
    async removeViewer(@Headers() header, @Body() body) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != body.uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });

        try {
            return await this.documentService.removeViewer(body.id, decodedToken.uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    @Put('editor')
    async addEditor(@Headers() header, @Body() body) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != body.uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });

        try {
            return await this.documentService.addEditor(body.id, decodedToken.uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    @Delete('editor')
    async removeEditor(@Headers() header, @Body() body) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != body.uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });

        try {
            return await this.documentService.removeEditor(body.id, decodedToken.uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }


    //file
    @Get('file')
    async getDocument(@Headers() header, @Query('id') id: string) {

        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        const document = await this.documentService.getDocument(id, decodedToken.uid);
        try {
            const pathToImage = join(process.cwd(), 'src', 'documentsStorage', document.uid, header['filename']);
            //read file json
            let file = fs.createReadStream(pathToImage);
            return new StreamableFile(file);

        } catch (error) {

            throw new HttpException("File not found", 500, { cause: new Error(error) });
        }
    }

    @Put('file')
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
    @Get('invite')
    async getInvite(@Headers() header, @Query('id') id: string,@Query('uid') uid: string) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });
        try {
            return this.documentService.getAllUserInDocument(id);
        }catch(err){
            throw new HttpException("File not found", 500, { cause: new Error(err) });
        }

    }

}
