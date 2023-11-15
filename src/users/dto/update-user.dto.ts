import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiProperty({ example:'john_doe@gmail.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example:'qwerty123' })
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;

    // Add any additional optional fields that can be updated here
}
