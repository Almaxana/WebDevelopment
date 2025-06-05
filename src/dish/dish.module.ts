import { forwardRef, Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { OrderModule } from '../order/order.module';
import { DishApiController } from './dish.api.controller';
import { DishResolver } from './dish.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dish]),
  ],
  providers: [DishService, DishResolver],
  controllers: [DishController, DishApiController],
  exports: [DishService]
})
export class DishModule {}
