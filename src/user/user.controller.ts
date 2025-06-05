import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('create')
  @Render("extraPages/user/UserCreate")
  async createPage() {

  }

  @Get('all')
  @Render("extraPages/user/AllUsers")
  async findAll() {
    return {
      users: await this.userService.findAll(),
    };
  }

  @Get(':id')
  @Render('extraPages/user/User')
  async findOne(@Param('id') id: string) {
    return {
      user: await this.userService.findOne(+id)
    };
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Get('update/:id')
  @Render("extraPages/user/UserUpdate")
  async updatePage(@Param('id') id: string) {
    return {
      user: await this.userService.findOne(+id),
    }
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
