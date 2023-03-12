/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Mail, MailDocument} from './../../schemas/mail.schema';

@Injectable()
export class MailService {
    constructor(@InjectModel(Mail.name) private MailModel: Model<MailDocument> ){}

    async getAllbyUserId(userId : string){
        // eslint-disable-next-line prefer-const
        let users = await this.MailModel.find({userId}).exec();
        return users;
    }

    async invite(){
        // eslint-disable-next-line prefer-const

    }
    async Accept(){
        // eslint-disable-next-line prefer-const
            
    }

    async Reject(){
        // eslint-disable-next-line prefer-const
                 
    }
}
