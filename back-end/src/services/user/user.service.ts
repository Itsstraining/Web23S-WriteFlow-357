import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private documentModel: Model<UserDocument>) { }

    async createUser(user: UserModel): Promise<UserDocument> {
        const createdUser = new this.documentModel(user);
        return createdUser.save();
    }

    async getUser(uid: string): Promise<UserDocument> {
        const user = this.documentModel.findOne({ uid: uid }).exec();
        return user;
    }

    async updateUser(uid: string, userModel: UserModel): Promise<UserDocument> {
        const user = await this.documentModel.findOne({ uid: uid }).exec();
        if (!user) return null;

        Object.assign(user, userModel);
        return user.save();
    }

}
