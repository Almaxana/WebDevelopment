import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Field(() => Int, {
    description: 'ID пользователя, который оформляет заказ',
  })
  @ApiPropertyOptional({
    example: 1,
    description: 'ID пользователя, который оформляет заказ',
  })
  authorId?: number;

  @Field(() => [Int], {
    description: 'Массив ID блюд, включённых в заказ',
  })
  @ApiPropertyOptional({
    example: [2, 5, 8],
    description: 'Массив ID блюд, включённых в заказ',
    type: [Number],
  })
  dishIds?: number[];
}
