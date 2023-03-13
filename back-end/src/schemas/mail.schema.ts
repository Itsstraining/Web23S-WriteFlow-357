/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MailDocModel } from 'src/models/document.model';
import { UserModel } from 'src/models/user.model';

export type MailDocument = HydratedDocument<Mail>;

@Schema()
export class Mail {

    @Prop({ type: Object })
    doc: MailDocModel;
    @Prop()
    date: string;
    @Prop()
    id: string;
    @Prop({ type: Object })
    sender: UserModel;
    @Prop()
    type: string;
    @Prop()
    right: string;
    @Prop({ type: Object })
    sendTo: UserModel;
    @Prop()
    isRead: boolean;
}

export const MailSchema = SchemaFactory.createForClass(Mail);