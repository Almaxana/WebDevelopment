import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Review } from '../entities/review.entity';

@ObjectType()
export class PaginatedReview {
  @Field(() => [Review])
  data: Review[];

  @Field(() => Int)
  total: number;
}
