import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<User> = {
      where: { id }
    };

    options.relations = ['orders', 'reservations', 'reviews'];


    const user = await this.usersRepository.findOne(options);
    if (!user) {
      throw new NotFoundException(`User с ID ${id} не найден`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User с ID ${id} не найден`);
    }

    if (updateUserDto.firstName != undefined && updateUserDto.lastName != undefined && updateUserDto.role != undefined) {
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.role = updateUserDto.role;
    } else {
      throw new BadRequestException("Fields can't be undefined");
    }

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user == null) {
      throw new NotFoundException("Такого пользователя нет");
    }
    await this.usersRepository.delete(id);
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {

    const [data, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
    };
  }
}
