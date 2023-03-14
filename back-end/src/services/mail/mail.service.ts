/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocModel, MailDocModel } from 'src/models/document.model';
import { UserModel } from 'src/models/user.model';
import { Doc, DocDocument } from 'src/schemas/document.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { DocumentService } from '../document/document.service';
import { Mail, MailDocument } from './../../schemas/mail.schema';

@Injectable()
export class MailService {
    constructor(@InjectModel(Mail.name) private mailModel: Model<MailDocument>, @InjectModel(Doc.name) private docModel: Model<DocDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createInvite(senderId: string, sentTo: string, docId: string, right: string) {
        let sender = await this.userModel.findOne({ id: senderId }).exec()
        let sendTo = await this.userModel.findOne({ email: sentTo }).exec();
        let doc = await this.docModel.findOne({ id: docId }).exec()
        let mail = {
            sender: sender._id,
            sendTo: sendTo._id,
            doc: doc._id,
            right: right,
            type: 'invite'
        }
        let document = await this.mailModel.create(mail);
        return document.save();
    }
    //     async acceptInvite(docId:string,right:string,uid:string,id:string){
    //         let document=await this.docModel.findOne({id:docId}).exec();
    //         let mail=await this.mailModel.findOne({id:id}).exec();
    //         if(!mail) return null;
    //         if(!document) return null;
    //         if(right=='canView'){
    //             document.canView.push(uid);
    //         }else{
    //             document.canEdit.push(uid);
    //         }
    //         let sendNotify=this.sendNotify(mail.sendTo,mail.sender,mail.docId,'accept')
    //         if(!sendNotify) return null;
    //         await mail.remove();
    //         return document.save();
    //     }
    //    async declineInvite(id:string){
    //         let mail=await this.mailModel.findOne({id:id}).exec();
    //         if(!mail) return null;
    //         let sendNotify=this.sendNotify(mail.sendTo,mail.sender,mail.docId,'decline')
    //         if(!sendNotify) return null;
    //         return mail.remove();
    //     }
    //    async sendNotify(sender:UserModel,sentTo:UserModel,docId:string,right:string){
    //         let now=Date.now();
    //         let mail:Mail={
    //             id:now.toString(),
    //             docId:docId,
    //             date:now.toString(),
    //             sender:sender,
    //             type:'notify',
    //             right:right,
    //             sendTo:sentTo,
    //             isRead:false
    //         }
    //         let document=await this.mailModel.create(mail);
    //         return document.save();
    //     }
    async getAll(uid: string) {
        let user=await this.docModel.findOne({uid:uid}).exec();
        let mails = await this.mailModel.find({ sentTo: user._id }).populate('sender').populate('sentTo').populate('doc').exec();
        console.log(mails)
        return mails;
    }
}
