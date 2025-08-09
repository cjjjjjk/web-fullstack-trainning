import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const res = await this.userService.createNewUser(createUserDto);
        return res
    }

    @Get('find-by-name')
    async getUserByName(@Query('name') name: string): Promise<User | { err: string }> {
        return await this.userService.getUserByName(name);
    }


    @Get('all')
    async getAllUser(): Promise<any> {
        return await this.userService.getAllUser();
    }


    @Get('random-avatar')
    getRandomAvatar(): string {
        return this.userService.getRandomProfileThumbnail();
    }

    @Patch("update")
    async updateUserInfo(@Body() updateinfo: UpdateUserDto) {
        return this.userService.updateUserInfo(updateinfo)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async deleteUserByName(
        @Query('name') name: string,
        @Req() req: any,
    ): Promise<any> {
        const currentUser = req.user;
        return await this.userService.deleteUserByName(currentUser.name, name);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: any) {
        return this.userService.getMe(req.user);
    }


}
