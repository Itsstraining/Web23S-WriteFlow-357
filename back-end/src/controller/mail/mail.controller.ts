/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */

import { Controller, Get, HttpException, Headers, Query, Put, Post, Body } from '@nestjs/common';
import { MailDocModel } from 'src/models/document.model';
import { UserModel } from 'src/models/user.model';
import { AuthService } from 'src/services/auth/auth.service';
import { MailService } from './../../services/mail/mail.service';
@Controller('mail')
export class MailController {

    constructor(private authService: AuthService, private mailService: MailService) { }

    @Get('getall')
    async getalluserbyId(@Headers() header, @Query('uid') uid: string) {

        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });
        try {
            return this.mailService.getAll(uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Post('invite')
    async createInvite(@Headers() header, @Body('sender') sender: string, @Body('sentTo') sentTo: string, @Body('docId') docId: string, @Body('right') right: string) {
        // console.log(sender,sentTo,docId,right);
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != sender) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });
        try {
            return this.mailService.createInvite(sender, sentTo, docId, right);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Put('accept')
    //docId:string,right:string,uid:string,id:string
    async acceptInvite(@Headers() header, @Body('docId') docId: string, @Body('right') right: string, @Body('uid') uid: string, @Body('id') id: string) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });
        try {
            return this.mailService.acceptInvite(docId, right, uid, id);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Put('decline')
    async declineInvite(@Headers() header, @Body('id') id: string, @Body('uid') uid: string) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
        if (decodedToken.uid != uid) throw new HttpException('Forbidden', 403, { cause: new Error("Forbidden") });
        try {
            return this.mailService.declineInvite(id);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }



}
