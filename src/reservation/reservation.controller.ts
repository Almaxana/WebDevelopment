import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('create')
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get('create')
  @Render('extraPages/reservation/ReservationCreate')
  async createPage(@Query('auth') auth: string) {
    const authed = auth === 'authed';
    return {
      status: authed,
    };
  }

  @Get('all')
  @Render('extraPages/reservation/AllReservations')
  async findAll() {
    const reservations = await this.reservationService.findAll();
    return {
      reservations: reservations,
    }
  }

  @Get(':id')
  @Render('extraPages/reservation/Reservation')
  async findOne(@Param('id') id: string) {
    return {
      reservation: await this.reservationService.findOne(+id),
    };
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return await this.reservationService.update(+id, updateReservationDto);
  }
  @Get('update/:id')
  @Render('extraPages/reservation/ReservationUpdate')
  async updatePage(@Param('id') id: string, @Query('auth') auth: string) {
    const authed = auth === 'authed';
    const reservation = await this.reservationService.findOne(+id);
    return {
      status: authed,
      reservation: reservation,
      reservationTime: reservation?.reservationTime.toISOString(),
    };
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
