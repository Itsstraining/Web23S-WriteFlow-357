/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocDocument = HydratedDocument<Doc>;

@Schema()
export class Doc {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    contentPath: string;

    @Prop()
    dateCreated: string;

    @Prop()
    dateModified: string;

    @Prop()
    stars: number;


    @Prop()
    isPublic: boolean;

    @Prop()
    isDelete: boolean;
    @Prop()
    forkedFrom: string;
    @Prop()
    canView:string[];
    @Prop()
    canEdit: string[];


    @Prop()
    uid: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Doc);