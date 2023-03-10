/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DocModel } from 'src/models/document.model';
import { UserModel } from 'src/models/user.model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    uid: string;

    @Prop()
    email: string;

    @Prop()
    bio: string;

    @Prop()
    job: string[];

    @Prop()
    displayName: string;

    @Prop()
    starDocuments:string[];

    @Prop()
    following: string[];

    @Prop()
    followers: string[];

    @Prop()
    photoURL: string;
}

export const UserSchema = SchemaFactory.createForClass(User);