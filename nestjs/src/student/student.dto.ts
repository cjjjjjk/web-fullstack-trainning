import { IsString, IsNotEmpty } from 'class-validator'

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    mssv: string;

    @IsString()
    @IsNotEmpty()
    email: string;


    @IsString()
    address: string;
}

export class UpdateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    mssv: string;

    @IsString()
    @IsNotEmpty()
    email: string;


    @IsString()
    address: string;
}