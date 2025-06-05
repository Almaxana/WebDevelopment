import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Reservation } from '../entities/reservation.entity';

@ObjectType()
export class PaginatedReservation {
  @Field(() => [Reservation])
  data: Reservation[];

  @Field(() => Int)
  total: number;
}
