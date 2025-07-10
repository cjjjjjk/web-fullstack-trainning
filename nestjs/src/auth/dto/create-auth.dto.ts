import { IsNotEmpty } from "class-validator"

export class CreateAuthDto {
    @IsNotEmpty({ message: "Name can not be empty !" })
    username: string;
    @IsNotEmpty({ message: "Password can not be empty ! " })
    password: string
}
