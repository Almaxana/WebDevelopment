import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Dish } from './entities/dish.entity';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PaginatedDishes } from './dto/paginated-dishes.output';

@Resolver(() => Dish)
export class DishResolver {
  constructor(private readonly dishService: DishService) {}

  @Mutation(() => Dish)
  async createDish(
    @Args('input') input: CreateDishDto,
  ): Promise<Dish> {
    return this.dishService.create(input);
  }

  @Query(() => [Dish], { name: 'dishes' })
  async findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Query(() => Dish, { name: 'dish', nullable: true })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Dish | null> {
    return this.dishService.findOne(id);
  }

  @Mutation(() => Dish, )
  async updateDish(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDishDto,
  ): Promise<Dish> {
    return this.dishService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeDish(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.dishService.remove(id);
    return true;
  }

  @Query(() => [Dish], { name: 'dishesByIds' })
  async findByIds(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<Dish[]> {
    return this.dishService.findByIds(ids);
  }

  @Query(() => [Dish], { name: 'freeDishes' })
  async findFreeFromOrder(): Promise<Dish[]> {
    return this.dishService.findFreeFromOrder();
  }

  @Query(() => PaginatedDishes, { name: 'dishesPaginated' })
  async findAllPaginated(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<{ data: Dish[]; total: number }> {
    return this.dishService.findAllPaginated(page, limit);
  }
}