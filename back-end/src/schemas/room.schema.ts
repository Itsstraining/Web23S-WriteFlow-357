/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserModel } from 'src/models/user.model';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
    @Prop()
    id: string;
    //prop type Array UserModel
    @Prop()
    users: Array<UserModel>;
    
}

export const RoomSchema = SchemaFactory.createForClass(Room);