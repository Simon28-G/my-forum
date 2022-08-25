/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.dto';
import { GetUserDto } from './GetUser.dto';

@Controller('users')
export class UserController {
  async create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async getOne(@Body() GetUserDto: GetUserDto) {
    return 'This action gets a user';
  }
}
