import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('review')
@Controller('api/review')
export class ReviewApiController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Review successfully created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @UsePipes(new ValidationPipe())
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all reviews with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of reviews' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const { data, total } = await this.reviewService.findAllPaginated(page, limit);
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
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Review ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Review found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Review not found' })
  async findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update review by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Review ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Review updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Review not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete review by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Review ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Review deleted' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Review not found' })
  async remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
