import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DocumentModel } from '../models/document.model';

export type UserDocumentDocument = HydratedDocument<UserDocument>;

@Schema()
export class UserDocument {
    @Prop()
    uid: string;

    @Prop()
    documents: DocumentModel[];
}

export const DocumentSchema = SchemaFactory.createForClass(UserDocument);