/* eslint-disable prettier/prettier */
import { UserModel } from "./user.model";

export interface RoomModel{
    id: string;
    users: Array<UserModel>;
}