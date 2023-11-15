import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ example:'john_doe@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example:'qwerty123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
