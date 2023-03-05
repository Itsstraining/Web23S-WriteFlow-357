import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentDocument = HydratedDocument<Document>;

@Schema()
export class Document {
    @Prop()
    id: string;

    @Prop()
    contentPath: string;

    @Prop()
    dateCreated: string;

    @Prop()
    dateModified: string;

    @Prop()
    status: string;

    @Prop()
    isDelete: boolean;

    @Prop()
    ownerId: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);