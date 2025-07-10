import { Injectable, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as avatars from "./avatars.json"

// import * as fs from 'fs'
// import * as path from 'path'
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService implements OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit {

    /*
        User module on init ... # User module khỏi tạo hoàn toàn xong trước app. app phải chờ user khởi tạo xong.
        Application bootstrap init...
        User service on application bootstrap ...
    */
    onApplicationBootstrap() {
        console.log("User service on application bootstrap ...")
    }
    onModuleInit() {
        console.log("User module on init ...")
    }
    afterInit() { // hook gateway lifecycle, thuộc về gateway
        console.log("User service after init ...")
    }


    onApplicationShutdown(signal?: string) {
        console.log("Application shutdown", signal)
    }

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    // private readonly filePath = path.join(__dirname, 'user.json')

    async getUserByName(name: string): Promise<User | { err: string }> {
        const userFound = await this.userRepo.findOneBy({ name });

        if (!userFound) {
            return { err: "Not found" };
        }

        return userFound;
    }


    async getAllUser(): Promise<any> {
        try {
            const users = await this.userRepo.find()
            return users
        } catch (er: any) {
            console.log(er);
            return er
        }
    }

    async createNewUser(createUserDto: CreateUserDto): Promise<any> {
        // json file data : test --------------------------------------
        // const rawData = fs.readFileSync(this.filePath, 'utf-8');
        // const userList: UserSchema[] = JSON.parse(rawData);
        // ------------------------------------------------------------

        try {
            await this.userRepo.save(createUserDto)
        } catch (err: any) {
            return err
        }
        return createUserDto
    }


    async updateUserInfo(updateinfo: UpdateUserDto): Promise<string> {
        const update_status = await this.userRepo.update(
            { name: updateinfo.name }, // Where conditional
            updateinfo
        )

        return update_status ? "Update complete" : "Update false"
    }

    async deleteUserByName(name: string): Promise<string> {
        const status = await this.userRepo.delete({ name })

        console.log("delete status: ", status)

        return `User "${name}" deleted`;
    }


    getRandomProfileThumbnail(): string {
        return avatars[Math.floor(Math.random() * avatars.length)];
    }


    // For authentication
    async findUserByPhone(phone: string): Promise<User | null> {
        const user: User | null = await this.userRepo.findOneBy({ phone: phone });
        return user
    }
}


