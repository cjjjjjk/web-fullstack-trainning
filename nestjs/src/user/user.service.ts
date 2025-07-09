import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as avatars from "./avatars.json"

import * as fs from 'fs'
import * as path from 'path'
import { UserSchema } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    private readonly filePath = path.join(__dirname, 'user.json')

    getUserByName(name: string): UserSchema {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const userList: UserSchema[] = JSON.parse(data);

        const userFound = userList.find(user =>
            user.name === name
        );


        if (!userFound) {
            return {
                name: 'notfound',
                address: 'unknown',
            };
        }

        return userFound;
    }

    getAllUser(): UserSchema[] {
        const fileData = fs.readFileSync(this.filePath, 'utf-8');
        const userList: UserSchema[] = JSON.parse(fileData);
        return userList
    }

    createNewUser(createUserDto: CreateUserDto): UserSchema | "error" {
        // json file data : test --------------------------------------
        // const rawData = fs.readFileSync(this.filePath, 'utf-8');
        // const userList: UserSchema[] = JSON.parse(rawData);
        // ------------------------------------------------------------
        try {

            // userList.push(createUserDto);

            // typeORM
            this.userRepo.save(createUserDto)
            // fs.writeFileSync(this.filePath, JSON.stringify(userList, null, 2), 'utf8');
        } catch (err: any) {
            return "error"
        }

        return createUserDto
    }

    updateUserInfo(updateinfo: UpdateUserDto) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const userList: UserSchema[] = JSON.parse(data);

        const index = userList.findIndex(user => {
            return user.name == updateinfo.name
        })

        if (index == -1) {
            return "User not found"
        }

        userList[index] = updateinfo;

        fs.writeFileSync(this.filePath, JSON.stringify(userList, null, 2), 'utf8')
        return "update complete"
    }

    deleteUserByName(name: string): string {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const userList: UserSchema[] = JSON.parse(data);

        const index = userList.findIndex(user =>
            user.name.trim().toLowerCase() === name.trim().toLowerCase()
        );

        if (index === -1) {
            return 'User not found';
        }

        userList.splice(index, 1);

        fs.writeFileSync(this.filePath, JSON.stringify(userList, null, 2), 'utf-8');

        return `User "${name}" deleted`;
    }


    getRandomProfileThumbnail(): string {
        return avatars[Math.floor(Math.random() * avatars.length)];
    }
}
