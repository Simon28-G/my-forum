/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import mongoose, { Model, Mongoose, ObjectId } from 'mongoose';
import { CreatePostDto } from 'src/controllers/CreatePost.dto';
import {
  LikedPost,
  LikedPostDocument,
} from 'src/models/likes/LikedPost.schema.';
import { Post, PostDocument } from 'src/models/posts/posts.schema';
import { PostPayload } from 'src/models/Types/PostPayload';
import { User } from 'src/models/Types/User';
import { CommentsService } from './comments.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(LikedPost.name)
    private likedPostModel: Model<LikedPostDocument>,
  ) {}

  async findAll() {
    return await this.postModel
      .find()
      .populate({ path: 'user', select: ['_id', 'username'] })
      .populate('likes')
      .lean()
      .exec();
  }

  async isPostLikedByUser(id: string, user: User) {
    if (user) {
      const alreadyLiked = await this.likedPostModel
        .findOne()
        .where('user')
        .equals(user.userId)
        .where('post')
        .equals(id);
      if (alreadyLiked) {
        return true;
      }
      return false;
    }
    throw new ForbiddenException('User needs to log in');
  }

  async create(createPostDto: CreatePostDto, user: User) {
    const currentUser = await this.postModel
      .find({ _id: user.userId })
      .where('user')
      .equals(user.userId);
    if (!currentUser) {
      throw new ForbiddenException(
        "User doesn't have the permissions to create a post",
      );
    }
    createPostDto['date'] = moment().format();
    createPostDto['user'] = user.userId;
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async update(payload: PostPayload, user: User) {
    const currentUser = await this.postModel
      .find({ _id: user.userId })
      .where('user')
      .equals(user.userId);
    if (!currentUser) {
      throw new ForbiddenException(
        "User doesn't have the permissions to update a post",
      );
    }
    payload['date'] = moment().format();
    const { _id, ...payloadWithOutId } = payload;
    const updateBody = { $set: payloadWithOutId };
    return this.postModel.findByIdAndUpdate(_id, updateBody).exec();
  }

  async delete(targetPost: string, user: User) {
    const canDelete = await this.postModel
      .findOneAndDelete({ _id: targetPost })
      .where('user')
      .equals(user.userId);
    if (!canDelete) {
      throw new ForbiddenException(
        "User doesn't have the permissions to delete a post",
      );
    }
    return canDelete;
  }

  async like(likedPostPayload: LikePostPayload, user: User) {
    const alreadyLiked = await this.likedPostModel
      .findOneAndDelete()
      .where('user')
      .equals(user.userId)
      .where('post')
      .equals(likedPostPayload.post);
    if (alreadyLiked) {
      return alreadyLiked;
    }
    likedPostPayload['user'] = user.userId;
    likedPostPayload['date'] = moment().format();
    const createdLike = new this.likedPostModel(likedPostPayload);
    return createdLike.save();
  }

  async getCountAllPosts(user: User) {
    return this.postModel
      .find({
        user: user.userId,
      })
      .count();
  }

  async getCountLikesByPosts(user: User) {
    const data = this.likedPostModel.find({
      user: user.userId,
    });
    console.log(data);
  }

  async getPostsByWeek(user: User) {
    const dateFrom = moment().add(-7, 'days');
    return this.postModel
      .find({ user: user.userId, date: { $gte: dateFrom } })
      .count();
  }

  async getLikesByWeek(user: User) {
    const dateFrom = moment().add(-7, 'days');
    return this.likedPostModel
      .find({
        user: user.userId,
        date: { $gte: dateFrom },
      })
      .count();
  }

  async getBiggestContributors() {
    const result = await this.postModel.aggregate([
      {
        $lookup: {
          from: 'Users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $addFields: {
          user: {
            $first: '$user',
          },
        },
      },
      {
        $project: {
          user: {
            password: 0,
          },
        },
      },
      {
        $group: {
          _id: '$user',
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    const arr = [['Users', 'Number of posts']];
    result.map((user) => {
      arr.push([user._id.username, user.count]);
    });
    return arr;
  }
}
