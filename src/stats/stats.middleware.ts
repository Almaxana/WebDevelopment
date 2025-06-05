import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { EndpointStat } from './stats.entity';

@Injectable()
export class StatsMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const repo = this.dataSource.getRepository(EndpointStat);
    const endpoint = req.baseUrl + req.path;

    const stat = await repo.findOne({ where: { endpoint } });

    if (stat) {
      stat.count += 1;
      await repo.save(stat);
    } else {
      const newStat = repo.create({ endpoint, count: 1 });
      await repo.save(newStat);
    }

    next();
  }
}
