import { ObjectType, Field } from '@nestjs/graphql';
import { Dish } from '../entities/dish.entity';

@ObjectType()
export class PaginatedDishes {
  @Field(() => [Dish])
  data: Dish[];

  @Field()
  total: number;
}