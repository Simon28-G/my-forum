/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/users/user.schema';
import { CreateUserDto } from 'src/controllers/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const supposedUser = await this.usersService.findOne(user.username);
    const hash = supposedUser.password;
    const isMatch = await bcrypt.compare(user.password, hash);
    if (isMatch) {
      const payload = {
        userId: supposedUser._id,
        username: supposedUser.username,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new BadRequestException({
      field: 'password',
      error: 'Incorrect password',
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
