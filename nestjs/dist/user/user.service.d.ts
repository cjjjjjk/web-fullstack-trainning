import { CreateUserDto } from './dto/create-user.dto';
import { UserSchema } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly filePath;
    getUserByName(name: string): UserSchema;
    getAllUser(): UserSchema[];
    createNewUser(createUserDto: CreateUserDto): UserSchema | "error";
    updateUserInfo(updateinfo: UpdateUserDto): "User not found" | "update complete";
    deleteUserByName(name: string): string;
    getRandomProfileThumbnail(): string;
}
