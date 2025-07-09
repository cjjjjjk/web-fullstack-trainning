"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const avatars = __importStar(require("./avatars.json"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
        return `User "${name}" deleted`;
    }
    getRandomProfileThumbnail() {
        return avatars[Math.floor(Math.random() * avatars.length)];
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map