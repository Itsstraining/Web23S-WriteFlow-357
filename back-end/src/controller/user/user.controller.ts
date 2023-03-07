import { Body, Controller, Get, Headers, HttpException, Put, Query } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';

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

    @Put('')
    async updateUser(@Headers() header: any, @Body() body: any) {
        let decodedToken = await this.authService.validateUser(header.authorization);
        if (!decodedToken) throw new HttpException('Unauthorized', 401);

        try {
            let uid = decodedToken.uid;
            return await this.userService.updateUser(uid, body);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
}
