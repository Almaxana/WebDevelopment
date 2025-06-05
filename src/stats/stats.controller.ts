import { Controller, Get, Render } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  @Render('extraPages/stats')
  async getStats() {
    const stats = await this.statsService.findAll();
    return { stats };
  }
}
