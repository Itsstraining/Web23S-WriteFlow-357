/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, HttpException, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { UserModel } from 'src/models/user.model';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import { saveImageToStorage, isFileValid, deleteFile } from './userImageFilter';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) { }

    @Get('')
    async getUser(@Headers() header: any, @Query('uid') uid: string) {
        try {
            if (!uid) throw new HttpException('uid is required', 400);
            return await this.userService.getUser(uid);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
    @Post('register')
    async registerUser(@Body() body: any) {
        try {
            let userData: UserModel = {
                uid: body.uid,
                email: body.email,
                bio: '',
                job: [],
                displayName: body.displayName,
                photoURL: body.photoURL,
                starDocuments: [],
                following: [],
                followers: [],
            }


            let user = await this.userService.createUser(userData);
            if (!user) throw new HttpException('User already exists', 400);
            return user;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    @Put('update')
    async updateUser(@Headers() header: any, @Body() body: any) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);

        try {
            let uid = decodedToken.uid;
            return this.userService.updateUser(uid, body);
        } catch (error) {
            throw new HttpException(error, 500, { cause: error });
        }
    }

    @Put('file')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    async updateUserFile(@UploadedFile() file: Express.Multer.File, @Headers() header) {
        if (!file) {
            return { error: 'File must be png, jpg, jpeg or wepb' };
        }

        const pathToImageFolder = join(process.cwd(), 'src', 'public', 'usersImage');
        const pathToImage = join(pathToImageFolder, file.filename);

        let fileValid = await isFileValid(pathToImage);

        if (fileValid) {
            let decodedToken = await this.authService.validateUser(header.authorization);
            if (!decodedToken) throw new HttpException('Unauthorized', 401);
        }

        deleteFile(pathToImage);
        return { error: "File extension doesn't match the file content" }
    }

}
