import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReviewDto {
  @IsString()
  @ApiProperty({
    description: 'Содержимое отзыва',
    example: 'Блюдо стало еще лучше!',
    required: true,
  })
  @Field({
    description: 'Содержимое отзыва',
    nullable: false
  })
  content: string;
}
