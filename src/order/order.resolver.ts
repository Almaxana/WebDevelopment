import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginatedOrders } from './dto/paginated-orders.output';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('input') input: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.create(input);
  }

  @Query(() => [Order], { name: 'orders' })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeOrder(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.orderService.remove(id);
    return true;
  }

  @Query(() => PaginatedOrders, { name: 'ordersPaginated' })
  async findAllPaginated(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<{ data: Order[]; total: number }> {
    return this.orderService.findAllPaginated(page, limit);
  }
}