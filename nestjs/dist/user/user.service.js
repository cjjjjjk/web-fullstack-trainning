"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let UserService = class UserService {
    filePath = path.join(__dirname, 'user.json');
    getUserByName(name) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const userList = JSON.parse(data);
        const userFound = userList.find(user => user.name === name);
        if (!userFound) {
            return {
                name: 'notfound',
                address: 'unknown',
            };
        }
        return userFound;
    }
    getAllUser() {
        const fileData = fs.readFileSync(this.filePath, 'utf-8');
        const userList = JSON.parse(fileData);
        return userList;
    }
    createNewUser(createUserDto) {
        const rawData = fs.readFileSync(this.filePath, 'utf-8');
        const userList = JSON.parse(rawData);
        try {
            userList.push(createUserDto);
            fs.writeFileSync(this.filePath, JSON.stringify(userList, null, 2), 'utf8');
        }
        catch (err) {
            return "error";
        }
        return createUserDto;
    }
    updateUserInfo(updateinfo) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const userList = JSON.parse(data);
        const index = userList.findIndex(user => {
            return user.name == updateinfo.name;
        });
        if (index == -1) {
            return "User not found";
        }
        userList[index] = updateinfo;
        fs.writeFileSync(this.filePath, JSON.stringify(userList, null, 2), 'utf8');
        return "update complete";
    }
    deleteUserByName(name) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const userList = JSON.parse(data);
        const index = userList.findIndex(user => user.name.trim().toLowerCase() === name.trim().toLowerCase());
        if (index === -1) {
            return 'User not found';
        }
        userList.splice(index, 1);
        fs.writeFileSync(this.filePath, JSON.stringify(userList, null, 2), 'utf-8');
        return `User "${name}" deleted successfully`;
    }
    getRandomProfileThumbnail() {
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
        ];
        const randomImage = randomProfileImages[Math.floor(Math.random() * randomProfileImages.length)];
        return randomImage;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map