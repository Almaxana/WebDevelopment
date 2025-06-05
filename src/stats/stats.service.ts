import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EndpointStat } from './stats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(EndpointStat)
    private statsRepo: Repository<EndpointStat>,
  ) {}

  findAll() {
    return this.statsRepo.find({
      order: {
        count: 'DESC',
      },
    });
  }
}
