import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndpointStat } from './stats.entity';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { StatsMiddleware } from './stats.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([EndpointStat])],
  controllers: [StatsController],
  providers: [StatsService, StatsMiddleware],
})
export class StatsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StatsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
