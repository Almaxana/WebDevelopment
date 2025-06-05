import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateReviewDto {
  @ApiProperty({
    description: 'Содержимое отзыва',
    example: 'Отличное блюдо, понравилось!',
  })
  @Field({
    description: 'Содержимое отзыва',
    nullable: false
  })
  @IsString()
  @IsNotEmpty({ message: 'Отзыв не может быть пустым' })
  content: string;

  @ApiProperty({
    description: 'ID автора отзыва',
    example: 1,
  })
  @Field(() => Int, {
    description: 'ID автора отзыва',
    nullable: false
  })
  @IsNotEmpty({ message: 'Автор обязателен' })
  author: number;
}