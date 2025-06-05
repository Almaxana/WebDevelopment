import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginatedReview } from './dto/paginated-reviews.output';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  async createReview(
    @Args('input') input: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewService.create(input);
  }

  @Query(() => [Review], { name: 'reviews' })
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Query(() => Review, { name: 'review' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeReview(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.reviewService.remove(id);
    return true;
  }

  @Query(() => PaginatedReview)
  async paginatedReviews(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ): Promise<PaginatedReview> {
    return this.reviewService.findAllPaginated(page, limit);
  }
}
