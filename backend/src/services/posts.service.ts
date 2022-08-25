/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreatePostDto } from 'src/controllers/CreatePost.dto';
import { Post, PostDocument } from 'src/models/posts/posts.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findOne(id: ObjectId): Promise<Post | undefined> {
    const result = this.postModel.findOne().where('_id').equals(id).exec();
    if (result === null) {
      throw new BadRequestException('Post not found');
    }
    return result;
  }

  async findAll(id: ObjectId): Promise<Post[] | undefined> {
    return this.postModel.find().exec();
  }

  async create(createPostDto: CreatePostDto): Promise<Post | undefined> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }
}
