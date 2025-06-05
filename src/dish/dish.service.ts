import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderDeleteEvent } from '../events/order-delete.event';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createDishDto: CreateDishDto): Promise<Dish> {
    if (createDishDto.protein + createDishDto.fat + createDishDto.carbohydrates === 0) {
      throw new BadRequestException('Хотя бы одно значение белков, жиров или углеводов должно быть положительным');
    }
    const dish = this.dishRepository.create(createDishDto);
    return await this.dishRepository.save(dish);
  }

  async findAll(): Promise<Dish[]> {
    return await this.dishRepository.find({
      relations: ['order'],
    });
  }

  async findOne(id: number): Promise<Dish | null> {
    const dish = await this.dishRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (dish == null) throw new NotFoundException("Такого блюда нет");
    return dish;
  }

  async update(id: number, updateDishDto: UpdateDishDto): Promise<Dish> {
    const dish = await this.dishRepository.findOne({ where: { id } });
    if (!dish) {
      throw new NotFoundException('Блюдо не найдено');
    }

    const { protein = dish.protein,
      fat = dish.fat,
      carbohydrates = dish.carbohydrates } = updateDishDto;

    if (protein + fat + carbohydrates === 0) {
      throw new BadRequestException(
        'Хотя бы одно значение белков, жиров или углеводов должно быть положительным'
      );
    }

    await this.dishRepository.update(id, updateDishDto);

    const updatedDish = await this.dishRepository.findOne({
      where: { id },
      relations: ['order']
    });

    if (!updatedDish) {
      throw new Error('Не удалось получить обновленное блюдо');
    }

    return updatedDish;
  }

  async remove(id: number): Promise<void> {

    const dish = await this.findOne(id);
    if (dish != null) {
      if (dish.order != null) {
        if (dish.order.dishes.length === 1) {
          this.eventEmitter.emit('order.delete', new OrderDeleteEvent(dish.order.id));
        }
      }
    }
    else throw new NotFoundException('Нет такого блюда');
    await this.dishRepository.delete(id);
  }

  async findByIds(ids: Array<number>) {
    return await this.dishRepository.findBy({ id: In(ids) });
  }

  async findFreeFromOrder() {
    return await this.dishRepository.find({
      where: { order: IsNull() },
    });
  }

  async findAllPaginated(page: number, limit: number) {
    const [data, total] = await this.dishRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }
}