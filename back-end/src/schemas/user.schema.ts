import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
    photoURL: string;
}

export const UserSchema = SchemaFactory.createForClass(User);