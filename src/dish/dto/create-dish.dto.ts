import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDishDto {
  @Field({ description: 'Название блюда' })
  @ApiProperty({ example: 'Potato', description: 'Название блюда' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Int, { description: 'Количество белков' })
  @ApiProperty({ example: 15, description: 'Количество белков', minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  protein: number;

  @Field(() => Int, { description: 'Количество жиров' })
  @ApiProperty({ example: 10, description: 'Количество жиров', minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  fat: number;

  @Field(() => Int, { description: 'Количество углеводов' })
  @ApiProperty({ example: 30, description: 'Количество углеводов', minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  carbohydrates: number;

  @Field(() => Int, { description: 'Цена блюда в рублях' })
  @ApiProperty({ example: 500, description: 'Цена блюда в рублях', minimum: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  price: number;

  @Field(() => Int, { description: 'Масса блюда в граммах' })
  @ApiProperty({ example: 250, description: 'Масса блюда в граммах', minimum: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  grams: number;
}
