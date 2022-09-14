/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from 'src/controllers/CreateUser.dto';
import { User, UserDocument } from 'src/models/users/user.schema';
import * as bcrypt from 'bcrypt';

interface formError {
  field: string;
  error: string;
}
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const alreadyExisted = await this.userModel
      .findOne()
      .where('username')
      .equals(createUserDto.username)
      .exec();
    if (!alreadyExisted) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel(createUserDto);
      const user = await createdUser.save();
      return user;
    }
    throw new BadRequestException({
      field: 'username',
      error: 'User already existed',
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string) {
    const result = await this.userModel
      .findOne()
      .where('username')
      .equals(username)
      .exec();
    if (!result) {
      throw new BadRequestException({
        field: 'username',
        error: 'User not found',
      });
    }
    return result;
  }

  async findOneById(id: string) {
    //const _id = { _id: +id };
    const _id = new mongoose.Types.ObjectId(id);
    const result = await this.userModel.find(_id).populate('user');
    if (!result) {
      throw new BadRequestException({
        error: 'Id of user not found',
      });
    }
    return result;
  }
  
}
