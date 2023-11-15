import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,
    ) {}

    // Create a new review
    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const review = this.reviewsRepository.create(createReviewDto);
        await this.reviewsRepository.save(review);
        return review;
    }

    // Retrieve all reviews
    async findAll(): Promise<Review[]> {
        return this.reviewsRepository.find();
    }

    // Retrieve a single review by id
    async findOne(id: number): Promise<Review> {
        const review = await this.reviewsRepository.findOne({
            where: {
                id,
            },
        });
        if (!review) {
            throw new NotFoundException(`Review with ID "${id}" not found`);
        }
        return review;
    }

    // Update a review by id
    async update(id: number, updateReviewDto: CreateReviewDto): Promise<Review> {
        const review = await this.findOne(id);
        Object.assign(review, updateReviewDto);
        await this.reviewsRepository.save(review);
        return review;
    }

    // Delete a review by id
    async remove(id: number): Promise<void> {
        const result = await this.reviewsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Review with ID "${id}" not found`);
        }
    }
}
