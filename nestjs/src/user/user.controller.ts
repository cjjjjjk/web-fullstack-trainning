import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSchema } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        const res: UserSchema | "error" = this.userService.createNewUser(createUserDto);
        return res
    }

    @Get('get-by-name')
    getUserByName(@Query('name') name: string): UserSchema {
        return this.userService.getUserByName(name);
    }

    @Get('all')
    getAllUser(): UserSchema[] {
        return this.userService.getAllUser();
    }


    @Get('random-avatar')
    getRandomAvatar(): string {
        return this.userService.getRandomProfileThumbnail();
    }

    @Patch("update")
    updateUserInfo(@Body() updateinfo: UpdateUserDto) {
        return this.userService.updateUserInfo(updateinfo)
    }

    @Delete("delete")
    deleteUserByName(@Query('name') name: string) {
        return this.userService.deleteUserByName(name);
    }
}
