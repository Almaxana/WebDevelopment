import { IsInt, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReservationDto {
  @Field(() => Int, { description: 'ID пользователя, который делает бронь' })
  @ApiProperty({
    description: 'ID пользователя, который делает бронь',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Field(() => Int, { description: 'Номер стола, который бронируется' })
  @ApiProperty({
    description: 'Номер стола, который бронируется',
    example: 5,
  })
  @IsInt()
  @IsNotEmpty()
  tableNumber: number;

  @Field(() => String, {description: 'Дата и время бронирования в формате ISO 8601' })
  @ApiProperty({
    description: 'Дата и время бронирования в формате ISO 8601',
    example: '2023-10-10T19:00:00',
  })
  @IsNotEmpty()
  reservationTime: Date;
}
