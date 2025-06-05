import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @Field(() => Int, { description: 'ID пользователя, который делает бронь' })
  @ApiPropertyOptional({
    description: 'ID пользователя, который делает бронь',
    example: 1,
  })
  userId?: number;

  @Field(() => Int, { description: 'Номер стола, который бронируется' })
  @ApiPropertyOptional({
    description: 'Номер стола, который бронируется',
    example: 5,
  })
  tableNumber?: number;

  @Field({ description: 'Дата и время бронирования в формате ISO 8601' })
  @ApiPropertyOptional({
    description: 'Дата и время бронирования в формате ISO 8601',
    example: '2025-04-10T18:30:00.000Z',
  })
  reservationTime?: Date;
}
