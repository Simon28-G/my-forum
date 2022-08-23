/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller } from '@nestjs/common';

@Controller()
export class UserController {

    async create(@Body() createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }
}
