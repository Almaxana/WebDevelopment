import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('reservation')
@Controller('api/reservation')
export class ReservationApiController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Reservation successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @UsePipes(new ValidationPipe())
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all reservations with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of reservations' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const { data, total } = await this.reservationService.findAllPaginated(page, limit);
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reservation by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Reservation ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reservation found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reservation not found' })
  async findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update reservation by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Reservation ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reservation updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reservation not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete reservation by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Reservation ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Reservation deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reservation not found' })
  async remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}