import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindOneParams } from './../dtos/find-one-params.dto';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return 'This action returns a user';
  }
}
