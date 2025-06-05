import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly userService: UserService,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const same_reservations = await this.reservationRepository.find({
      where: {
        tableNumber: createReservationDto.tableNumber,
        reservationTime: createReservationDto.reservationTime,
      },
    });
    if (same_reservations.length > 0) {
      throw new BadRequestException("Reservation already exist");
    }
    const user = await this.userService.findOne(createReservationDto.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${createReservationDto.userId} not found`);
    }

    // Создаем Reservation
    const reservation = this.reservationRepository.create({
      user: user, // Передаем объект User
      tableNumber: createReservationDto.tableNumber,
      reservationTime: createReservationDto.reservationTime,
    });
    return await this.reservationRepository.save(reservation);
  }

  async findAll() {
    return await this.reservationRepository.find({relations: ['user']});
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (reservation == null) throw  new NotFoundException("Такой брони нет");

    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOne({ where: { id } });
    if (reservation == null) {
      throw new NotFoundException(`Reservation with id ${id} не найден`);
    }
    const same_reservations = await this.reservationRepository.find({
      where: {
        tableNumber: updateReservationDto.tableNumber,
        reservationTime: updateReservationDto.reservationTime,
      },
    });
    if (same_reservations.length > 0) {
      throw new BadRequestException("Reservation already exist");
    }
    if (updateReservationDto.tableNumber != undefined) {
      reservation.tableNumber = updateReservationDto.tableNumber;
    }
    if (updateReservationDto.reservationTime != undefined) {
      reservation.reservationTime = updateReservationDto.reservationTime;
    }

    return await this.reservationRepository.save(reservation);

  }

  async remove(id: number) {
    const reservation = await this.findOne(id);
    if (reservation == null) {
      throw new NotFoundException("Такой брони нет");
    }
    await this.reservationRepository.delete(id);
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {
    const [data, total] = await this.reservationRepository.findAndCount({
      relations: ['user'], // Подгружаем связанные сущности
      skip: (page - 1) * limit,
      take: limit,
      order: { reservationTime: 'ASC' }, // Сортировка по времени бронирования
    });

    return { data, total };
  }
}
