import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewsService.create(createReviewDto);
    }

    @Get()
    findAll(): Promise<Review[]> {
        return this.reviewsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Review> {
        return this.reviewsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewsService.update(id, updateReviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.reviewsService.remove(id);
    }
}
