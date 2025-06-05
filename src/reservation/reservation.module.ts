import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ReservationApiController } from './reservation.api.controller';
import { ReservationResolver } from './reservation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), UserModule],
  controllers: [ReservationController, ReservationApiController],
  providers: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
