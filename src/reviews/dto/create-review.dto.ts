import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty({ example:'Your review' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ example: 5})
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    // If you have relations like author, and you want to send an authorId
    @ApiProperty({ example: 25 })
    @IsNotEmpty()
    @IsInt()
    authorId: number;
}
