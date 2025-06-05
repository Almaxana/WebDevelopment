import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';

@ObjectType()
export class PaginatedOrders {
  @Field(() => [Order])
  data: Order[];

  @Field()
  total: number;
}