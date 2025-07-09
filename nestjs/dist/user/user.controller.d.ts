import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSchema } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): UserSchema | "error";
    getUserByName(name: string): UserSchema;
    getAllUser(): UserSchema[];
    getRandomAvatar(): string;
    updateUserInfo(updateinfo: UpdateUserDto): "User not found" | "update complete";
    deleteUserByName(name: string): string;
}
