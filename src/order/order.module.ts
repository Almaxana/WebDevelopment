import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishModule } from '../dish/dish.module';
import { UserRole } from '../user/entities/user-role.enum';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { OrderApiController } from './order.api.controller';
import { OrderResolver } from './order.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    DishModule,
    UserModule
  ],
  controllers: [OrderController, OrderApiController],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
