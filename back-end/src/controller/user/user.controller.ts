/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, HttpException, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { UserModel } from 'src/models/user.model';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import { isFileValid, deleteFile, saveAvatarToStorage, saveBannerToStorage } from './userImageFilter';

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
                bannerURL: '',
                starDocuments: [],
                following: [],
                followers: [],
            }


            let user = await this.userService.createUser(userData);
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

    @Put('upload-avatar')
    @UseInterceptors(FileInterceptor('file-avatar', saveAvatarToStorage))
    async updateUserAvatarFile(@UploadedFile() file: Express.Multer.File, @Headers() header) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);

        if (!file) {
            return { error: 'File must be png, jpg, jpeg or wepb' };
        }

        const pathToImageFolder = join(process.cwd(), 'src', 'public', decodedToken.uid, 'avatar');
        const pathToImage = join(pathToImageFolder, file.filename);

        let fileValid = await isFileValid(pathToImage);
        if (fileValid) {
            return await this.userService.updateUserAvatar(decodedToken.uid, `http://localhost:3000/static/${decodedToken.uid}/avatar/${file.filename}`);
        }

        deleteFile(pathToImage);
        return { error: "File extension doesn't match the file content" }
    }

    @Put('upload-banner')
    @UseInterceptors(FileInterceptor('file-banner', saveBannerToStorage))
    async updateUserBannerFile(@UploadedFile() file: Express.Multer.File, @Headers() header) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);

        if (!file) {
            return { error: 'File must be png, jpg, jpeg or wepb' };
        }

        const pathToImageFolder = join(process.cwd(), 'src', 'public', decodedToken.uid, 'banner');
        const pathToImage = join(pathToImageFolder, file.filename);

        let fileValid = await isFileValid(pathToImage);
        if (fileValid) {
            return await this.userService.updateUserBanner(decodedToken.uid, `http://localhost:3000/static/${decodedToken.uid}/banner/${file.filename}`);
        }

        deleteFile(pathToImage);
        return { error: "File extension doesn't match the file content" }
    }

}
