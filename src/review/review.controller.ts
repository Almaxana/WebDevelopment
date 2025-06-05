import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query, BadRequestException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('create')
  @Render('extraPages/review/ReviewCreate')
  async createPage(@Query('auth') auth: string) {
    const authed = auth === 'authed';
    return {
      status: authed,
    }
  }

  @Get('all')
  @Render('extraPages/review/AllReviews')
  async findAll(@Query('auth') auth: string) {
    const reviews = await this.reviewService.findAll();
    const authed = auth === 'authed';
    return {
      reviews: reviews,
      status: authed,
    }
  }

  @Get(':id')
  @Render('extraPages/review/Review')
  async findOne(@Param('id') id: string, @Query('auth') auth: string) {
    const review = await this.reviewService.findOne(+id);
    const authed = auth === 'authed';
    return {
      review: review,
      status: authed,
    }
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Get('update/:id')
  @Render('extraPages/review/ReviewUpdate')
  async updatePage(@Param('id') id: string, @Query('auth') auth: string) {
    const review = await this.reviewService.findOne(+id);
    const authed = auth === 'authed';
    return {
      review: review,
      status: authed,
    }
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
