import { IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'ID пользователя, который оформляет заказ',
  })
  @Field(() => Int, {
    description: 'ID пользователя, который оформляет заказ',
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({
    example: [2, 5, 8],
    description: 'Массив ID блюд, включённых в заказ',
    type: [Number],
  })
  @Field(() => [Int], {
    description: 'Массив ID блюд, включённых в заказ',
  })
  @IsArray()
  @IsNotEmpty()
  dishIds: number[]; // Массив идентификаторов блюд
}
