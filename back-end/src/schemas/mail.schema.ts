/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MailDocument = HydratedDocument<Mail>;

@Schema()
export class Mail {

    @Prop()
    docId: string;

    @Prop()
    date: string;

    @Prop()
    id: string;

    @Prop()
    sender: string;

    @Prop()
    type: string;

    @Prop()
    sendTo: string;

    @Prop()
    isRead: boolean;
}

export const MailSchema = SchemaFactory.createForClass(Mail);