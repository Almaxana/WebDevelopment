import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    const user = await this.userService.findOne(createReviewDto.author);
    if (!user) {
      throw new NotFoundException(`User with ID ${createReviewDto.author} not found`);
    }
    const review = await this.reviewRepository.create({
      author: user,
      content: createReviewDto.content
      }
    );
    const reviewSaved = this.reviewRepository.save(review);
    this.eventEmitter.emit('review.created', reviewSaved);

    return reviewSaved;
  }

  async findAll() {
    return this.reviewRepository.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id }});

    if (!review) {
      throw new NotFoundException(`Review с ID ${id} не найден`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    if (updateReviewDto.content != "" && updateReviewDto.content != undefined) {
      review.content = updateReviewDto.content;
    } else {
      throw new BadRequestException("Content can't be empty string");
    }
    return this.reviewRepository.save(review);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    if (review == null) {
      throw new NotFoundException("Такого отзыва нет");
    }
    await this.reviewRepository.delete(id);
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.reviewRepository.findAndCount({
      skip: skip,
      take: limit,
    });

    return {
      data,
      total,
    };
  }
}
