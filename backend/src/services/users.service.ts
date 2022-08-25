/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/controllers/CreateUser.dto';
import { User, UserDocument } from 'src/models/users/user.schema';
import * as bcrypt from 'bcrypt';

interface formError {
  field: string;
  error: string;
}
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyExisted = await this.userModel
      .findOne()
      .where('username')
      .equals(createUserDto.username)
      .exec();
    if (alreadyExisted === null) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel(createUserDto);
      const { username, ...restProps } = await createdUser.save();
      return username;
    }
    throw new BadRequestException({
      field: 'username',
      error: 'User already existed',
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User | undefined> {
    const result = await this.userModel
      .findOne()
      .where('username')
      .equals(username)
      .exec();
    if (result === null) {
      throw new BadRequestException({
        field: 'username',
        error: 'User not found',
      });
    }
    return result;
  }
}
