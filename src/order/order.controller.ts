import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DishService } from '../dish/dish.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly dishService: DishService,) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('create')
  @Render('extraPages/order/OrderCreate')
  async createPage(@Query('auth') auth: string) {
    const authed = auth === 'authed';
    const dishes = await this.dishService.findFreeFromOrder()
    return {
      status: authed,
      dishes: dishes
    };
  }

  @Get('all')
  @Render('extraPages/order/AllOrders')
  async findAll(@Query('auth') auth: string) {
    const orders = await this.orderService.findAll();
    const authed = auth === 'authed';
    return {
      orders: orders,
      status: authed,
    }
  }

  @Get(':id')
  @Render('extraPages/order/Order')
  async findOne(@Param('id') id: string) {
    const order = await this.orderService.findOne(+id);
    return {
      order: order
    };
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Get('update/:id')
  @Render('extraPages/order/OrderUpdate')
  async updatePage(@Param('id') id: string) {
    const freeDishes = await this.dishService.findFreeFromOrder();
    const order = await this.orderService.findOne(+id);

    return {
      order: order,
      freeDishes: freeDishes
    }
  }


  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
