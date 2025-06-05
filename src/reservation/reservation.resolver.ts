import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationService } from './reservation.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PaginatedReservation } from './dto/paginated-reservations-output';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Mutation(() => Reservation)
  async createReservation(
    @Args('input') input: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.create(input);
  }

  @Query(() => [Reservation], { name: 'reservations' })
  async findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Query(() => Reservation, { name: 'reservation' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Reservation> {
    return this.reservationService.findOne(id);
  }

  @Mutation(() => Reservation)
  async updateReservation(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeReservation(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.reservationService.remove(id);
    return true;
  }

  @Query(() => PaginatedReservation)
  async paginatedReservations(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ): Promise<PaginatedReservation> {
    return this.reservationService.findAllPaginated(page, limit);
  }
}
