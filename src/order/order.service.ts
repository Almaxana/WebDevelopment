import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { DishService } from '../dish/dish.service';
import { LazyModuleLoader } from '@nestjs/core';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OrderDeleteEvent } from '../events/order-delete.event';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly dishService: DishService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    if (createOrderDto.dishIds.length === 0) {
      throw new BadRequestException("В заказе нет блюд")
    }
    const dishes = await this.dishService.findByIds(createOrderDto.dishIds);
    if (dishes.length !== createOrderDto.dishIds.length) {
      throw new NotFoundException('Некоторые блюда не найдены');
    }
    const author = await this.userService.findOne(createOrderDto.authorId);
    if (!author) {
      throw new NotFoundException(`User with ID ${createOrderDto.authorId } not found`);
    }

    const order = this.orderRepository.create({ author, dishes });
    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['dishes'],
    });
  }

  async findOne(id: number) {
    const order =  await this.orderRepository.findOne({ where: { id } });
    if (order == null) throw new NotFoundException("Такого заказа нет");
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id }, relations: ['dishes'] });
    if (!order) {
      throw new NotFoundException(`Заказ с ID ${id} не найден`);
    }

    if (updateOrderDto.dishIds) {
      const dishes = await this.dishService.findByIds(updateOrderDto.dishIds);
      if (dishes.length !== updateOrderDto.dishIds.length) {
        throw new NotFoundException('Некоторые блюда не найдены');
      }
      order.dishes = dishes; // Обновляем блюда в заказе
    }
    return await this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (order == null) {
      throw new NotFoundException("Такого заказа нет");
    }
    await this.orderRepository.delete(id);
  }

  @OnEvent('order.delete')
  async handleOrderCreatedEvent(payload: OrderDeleteEvent) {
    await this.remove(payload.orderId);
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {
    const [data, total] = await this.orderRepository.findAndCount({
      relations: ['dishes'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' }, // Сортировка по дате создания (новые сначала)
    });

    return {
      data,
      total,
    };
  }
}
