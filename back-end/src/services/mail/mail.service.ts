/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
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
        let sender = await this.userModel.findOne({ uid: senderId }).exec()
        let sendTo = await this.userModel.findOne({ email: sentTo }).exec();
        if (sender._id === sendTo._id) throw new HttpException('You can not invite yourself', 409);
        let doc = await this.docModel.findOne({ id: docId }).exec()
        let mailExists = await this.mailModel.findOne({ sender: sender._id, sendTo: sendTo._id, doc: doc._id }).exec();
        // if exists throw 409 conflict resource
        if (mailExists) throw new HttpException('Already invited', 409);
        let mail = {
            sender: sender._id,
            sendTo: sendTo._id,
            date: Date.now().toString(),
            doc: doc._id,
            right: right,
            type: 'invite'
        }
        let document = await this.mailModel.create(mail);
        return document.save();
    }
    async acceptInvite(docId: string, right: string, uid: string, id: string) {
        let document = await this.docModel.findOne({ id: docId }).exec();
        let mail = await this.mailModel.findOne({ id: id }).exec();
        if (!mail) throw new HttpException('Not found', 404);
        if (!document) throw new HttpException('Not found', 404);
        if (right == 'canView') {
            document.canView.push(uid);
        } else {
            document.canEdit.push(uid);
        }
        let sendNotify = this.sendNotify(mail.sendTo, mail.sender, mail.doc, 'accept')
        if (!sendNotify) return null;
        await document.save();
        return mail.remove();
    }
    async declineInvite(id: string) {
        let mail = await this.mailModel.findOne({ id: id }).exec();
        if (!mail) throw new HttpException('Not found', 404);
        let sendNotify = this.sendNotify(mail.sendTo, mail.sender, mail.doc, 'decline')
        if (!sendNotify) return null;
        return mail.remove();
    }
    async sendNotify(sender: UserModel, sentTo: UserModel, docId: any, right: string) {
        let now = Date.now();
        let mail: Mail = {
            id: now.toString(),
            doc: docId,
            date: now.toString(),
            sender: sender,
            type: 'notify',
            right: right,
            sendTo: sentTo,
            isRead: false
        }
        let document = await this.mailModel.create(mail);
        return document.save();
    }
    async getAll(uid: string) {
        let user = await this.userModel.findOne({ uid: uid }).exec();
        let mails = await this.mailModel.find({ sendTo: user._id }).populate('doc').populate('sender').populate('sendTo').exec();
        return mails;
    }
}
