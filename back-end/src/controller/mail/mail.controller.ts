/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */

import { Controller, Get, HttpException, Headers, Query } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { MailService } from './../../services/mail/mail.service';
@Controller('mail')
export class MailController {

   constructor(private authService: AuthService, private mailService: MailService) { } 

   @Get('getall')
   async getalluserbyId(@Headers() header, @Query('id') id : string){
    let decodedToken = await this.authService.validateUser(header.authorization);
    if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
    try {
        return this.mailService.getAllbyUserId(id);
    } catch (error) {
        throw new HttpException(error, 500);
    }
   }

//    @Get('accept')
//    async AcceptRequest(@Headers() header)
//    {
//     let decodedToken = await this.authService.validateUser(header.authorization);
//     if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
//     try {
        
//     } catch (error) {
//         throw new HttpException(error, 500);
//     }
//    }

//    @Get('reject')
//    async RejectRequest(@Headers() header)
//    {
//     let decodedToken = await this.authService.validateUser(header.authorization);
//     if (!decodedToken) throw new HttpException('Unauthorized', 401, { cause: new Error("Unauthorized") });
//     try {
        
//     } catch (error) {
//         throw new HttpException(error, 500);
//     }
//    }
}
