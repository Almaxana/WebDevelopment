import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('create')
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Get('create')
  @Render('extraPages/dish/DishCreate')
  async createPage(@Query('auth') auth: string) {
    const authed = auth === 'authed';
    return {
      status: authed,
    };
  }

  @Get('Menu')
  @Render('extraPages/dish/Menu')
  async menu(@Query('auth') auth: string) { // findAll
    const authed = auth === 'authed';
    const dishes = await this.dishService.findAll();

    return {
      status: authed,
      dishes: dishes,
    };
  }

  @Get(':id')
  @Render('extraPages/dish/Dish')
  async findOne(@Query('auth') auth: string, @Param('id') id: string) {
    const authed = auth === 'authed';
    const dish = await this.dishService.findOne(+id);

    return {
      status: authed,
      dish: dish,
    };

  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(+id, updateDishDto);
  }
  @Get('update/:id')
  @Render('extraPages/dish/DishUpdate')
  async updatePage(@Param('id') id: string, @Query('auth') auth: string) {
    const authed = auth === 'authed';
    const dish = await this.dishService.findOne(+id);
    return {
      status: authed,
      dish: dish,
    };
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.dishService.remove(+id);
  }
}
