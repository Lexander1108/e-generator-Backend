import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsInt()
    senderId: number;

    @IsNotEmpty()
    @IsInt()
    receiverId: number;
}
