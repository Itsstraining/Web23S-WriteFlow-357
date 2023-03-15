/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomModel } from 'src/models/room.model';
import { UserModel } from 'src/models/user.model';
import { Room, RoomDocument } from 'src/schemas/room.schema';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {
    }

    async create(id: string, firstUser: UserModel): Promise<Room> {
        let room: RoomModel = {
            id: id,
            users: [firstUser]
        };
        let document = await this.roomModel.create(room);
        return document.save();
    }
    async addUser(id: string, user: UserModel): Promise<Room> {
        try {
            const document = await this.roomModel.findOne({ id: id }).exec();
         
            if (!document) return this.create(id, user);
           
            let inRoom = document.users.findIndex((userInRoom) => userInRoom.uid == user.uid);
        
            if (inRoom !== -1) return null;
            document.users.push(user);
            return document.save();
        } catch (err) {
            console.log('lỗi 4', err);
        }


    }
    async get(id: string): Promise<Room> {
        try {
            const document = await this.roomModel.findOne({ id: id }).exec();
            if (!document) return null;
            return document;
        } catch (err) {
            console.log('lỗi 3', err);
        }

    }
    async delete(id: string): Promise<Room> {
        try {
            const document = await this.roomModel.findOne({ id: id }).exec();
          
            if (!document) return null;

            return document.remove();
        } catch (err) {
            console.log('lỗi 2', err);
        }

    }
    async removeUser(id: string, user: string): Promise<Room> {
        try {
            const document = await this.roomModel.findOne({ id: id }).exec();
            document.users = document.users.filter((userInRoom) => userInRoom.uid !== user);
            // console.log(document);
            // if (!document) return null;
            // let inRoom = document.users.findIndex((userInRoom) => userInRoom.uid === user.uid);
            // console.log(document.users[inRoom]);
            // console.log(inRoom);
            // if (inRoom !== -1) return null;
            // document.users.splice(inRoom, 1);
            if (document.users.length === 0) return await this.delete(id);
            return document.save();
        } catch (err) {
            console.log('lỗi 1', err);
        }

    }
}
