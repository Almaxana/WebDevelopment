import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ReviewApiController } from './review.api.controller';
import { ReviewResolver } from './review.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UserModule],
  controllers: [ReviewController, ReviewApiController],
  providers: [ReviewService, ReviewResolver],
})
export class ReviewModule {}
