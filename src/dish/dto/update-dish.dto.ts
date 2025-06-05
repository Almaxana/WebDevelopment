import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from './create-dish.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDishDto extends PartialType(CreateDishDto) {
  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 'New potato', description: 'Название блюда' })
  name?: string;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 20, description: 'Обновлённое количество белков', minimum: 0 })
  protein?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 12, description: 'Обновлённое количество жиров', minimum: 0 })
  fat?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 35, description: 'Обновлённое количество углеводов', minimum: 0 })
  carbohydrates?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 550, description: 'Обновлённая цена блюда в рублях', minimum: 1 })
  price?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 300, description: 'Обновлённый вес блюда в граммах', minimum: 1 })
  grams?: number;
}
