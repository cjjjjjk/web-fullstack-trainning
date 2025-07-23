import { IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    phone: string

    @IsString()
    @IsNotEmpty()
    password: string
}