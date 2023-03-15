/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DocModel, MailDocModel } from 'src/models/document.model';
import { UserModel } from 'src/models/user.model';
import { Doc } from './document.schema';
import { User } from './user.schema';

export type MailDocument = HydratedDocument<Mail>;

@Schema()
export class Mail {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doc' })
    doc: Doc;
    @Prop()
    date: string;
    @Prop()
    id: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    sender: User;
    @Prop()
    type: string;
    @Prop()
    right: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    sendTo: User;
    @Prop()
    isRead: boolean;
}

export const MailSchema = SchemaFactory.createForClass(Mail);