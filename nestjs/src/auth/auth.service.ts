import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword_helper } from 'src/helper/utils';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    // Validation login với phone + pass
    async validateUser(phone: string, pass: string): Promise<User | false> {
        const user: User | null = await this.userService.findUserByPhone(phone);
        // console.log(user?.password, pass)

        if (user == null) {
            return false
        } else {
            // Trong trường hợp password đã được hash
            // const isValidPassword = await comparePassword_helper(pass, user.password)

            // Đơn giản hoá
            if (user.password == pass) {
                return user;
            } else return false
        }
    }
    // Login thành công
    async login(user: any) {
        // Destructure để loại bỏ password, giữ lại phần còn lại
        const { password, ...payload } = user;

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: payload
        };
    }

}
