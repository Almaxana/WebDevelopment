import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('dish')
@Controller('api/dish')
export class DishApiController {
  constructor(private readonly dishService: DishService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new dish' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Dish successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @UsePipes(new ValidationPipe())
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Get('menu')
  @ApiOperation({ summary: 'Get all dishes with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of dishes' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const { data, total } = await this.dishService.findAllPaginated(page, limit);
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Dish found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Dish not found' })
  async findOne(@Param('id') id: string) {
    return this.dishService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Dish updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Dish not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(+id, updateDishDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete dish by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Dish ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Dish deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Dish not found' })
  async remove(@Param('id') id: string) {
    return this.dishService.remove(+id);
  }
}