import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Review]), // Import the TypeOrm module and inject repository for Review entity
    ],
    controllers: [ReviewsController], // Controllers that belong to this module
    providers: [ReviewsService], // Services (providers) that belong to this module
})
export class ReviewsModule {}
