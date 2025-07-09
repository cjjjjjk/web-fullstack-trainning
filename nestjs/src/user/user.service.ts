import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import * as fs from 'fs'
import * as path from 'path'
import { UserSchema } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

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
        const rawData = fs.readFileSync(this.filePath, 'utf-8');
        const userList: UserSchema[] = JSON.parse(rawData);
        try {

            userList.push(createUserDto);
            fs.writeFileSync(this.filePath, JSON.stringify(userList, null, 2), 'utf8');
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

        return `User "${name}" deleted successfully`;
    }


    getRandomProfileThumbnail(): string {
        const randomProfileImages = [
            "https://randomuser.me/api/portraits/men/90.jpg",
            "https://randomuser.me/api/portraits/men/0.jpg",
            "https://randomuser.me/api/portraits/men/35.jpg",
            "https://randomuser.me/api/portraits/men/68.jpg",
            "https://randomuser.me/api/portraits/men/75.jpg",
            "https://randomuser.me/api/portraits/men/46.jpg",
            "https://randomuser.me/api/portraits/men/56.jpg",
            "https://randomuser.me/api/portraits/men/34.jpg",
            "https://randomuser.me/api/portraits/men/63.jpg",
            "https://randomuser.me/api/portraits/men/88.jpg",
            "https://randomuser.me/api/portraits/women/2.jpg",
            "https://randomuser.me/api/portraits/women/56.jpg",
            "https://randomuser.me/api/portraits/women/23.jpg",
            "https://randomuser.me/api/portraits/women/1.jpg",
            "https://randomuser.me/api/portraits/women/67.jpg",
            "https://randomuser.me/api/portraits/women/68.jpg",
            "https://randomuser.me/api/portraits/women/94.jpg",
            "https://randomuser.me/api/portraits/women/8.jpg",
            "https://randomuser.me/api/portraits/women/50.jpg"
        ]
        const randomImage: string = randomProfileImages[Math.floor(Math.random() * randomProfileImages.length)]
        return randomImage;
    }
}
