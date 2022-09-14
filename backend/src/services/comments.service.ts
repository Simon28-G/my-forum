/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateCommentDto } from 'src/controllers/CreateComment.dto';
import { Comment, CommentDocument } from 'src/models/comments/comment.schema';
import {
  LikedComment,
  LikedCommentDocument,
} from 'src/models/likes/LikedComment.schema.';
import { CommentPayload } from 'src/models/Types/CommentPayload';
import { ResponseComment } from 'src/models/Types/ResponseComment';
import { User } from 'src/models/Types/User';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(LikedComment.name)
    private likedCommentModel: Model<LikedCommentDocument>,
  ) {}

  async findOne(id: ObjectId): Promise<Comment | undefined> {
    const result = this.commentModel.findOne().where('_id').equals(id).exec();
    if (result === null) {
      throw new BadRequestException('Comment not found');
    }
    return result;
  }

  // async findAllByPost(idPost: string): Promise<CommentDocument[] | undefined> {
  //   const data: any = await this.commentModel
  //     .find()
  //     .populate({ path: 'post', select: ['_id', 'user'] })
  //     .populate({ path: 'author', select: ['_id', 'username'] })
  //     .where('id_post')
  //     .equals(idPost)
  //     .exec();

  //   return data;
  // }
  async findAll(user?: User) {
    return await this.commentModel
      .find()
      .populate({ path: 'author', select: ['_id', 'username'] })
      .populate({ path: 'likes' })
      .lean()
      .exec();

    // const result = await this.commentModel.aggregate<ResponseComment>([

    //   {
    //     $lookup: {
    //       from: 'Users',
    //       localField: 'author',
    //       foreignField: '_id',
    //       as: 'author',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       author: {
    //         $first: '$author',
    //       },
    //       likedByMe: false,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$post',
    //       comments: {
    //         $push: '$$ROOT',
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       'comments.author': {
    //         password: 0,
    //       },
    //     },
    //   },
    // ]);
  }

  async isCommentLikedByUser(id: string, user: User) {
    if (user) {
      const alreadyLiked = await this.likedCommentModel
        .findOne()
        .where('user')
        .equals(user.userId)
        .where('comment')
        .equals(id);
      if (alreadyLiked) {
        return true;
      }
      return false;
    }
    throw new ForbiddenException('User needs to log in');
  }
  async create(createCommentDto: CreateCommentDto, user: User) {
    const currentUser = await this.commentModel
      .find({ _id: user.userId })
      .where('author')
      .equals(user.userId);
    if (!currentUser) {
      throw new ForbiddenException(
        "User doesn't have the permissions to update a comment",
      );
    }
    createCommentDto['date'] = moment().format();
    createCommentDto['post'] = createCommentDto.post;
    createCommentDto['author'] = user.userId;
    const createdPost = new this.commentModel(createCommentDto);
    return createdPost.save();
  }

  async update(payload: CommentPayload, user: User) {
    const currentUser = await this.commentModel
      .find({ _id: user.userId })
      .where('user')
      .equals(user.userId);
    if (!currentUser) {
      throw new ForbiddenException(
        "User doesn't have the permissions to update a comment",
      );
    }
    payload['date'] = moment().format();
    const { _id, ...payloadWithOutId } = payload;
    const updateBody = { $set: payloadWithOutId };
    return this.commentModel.findByIdAndUpdate(_id, updateBody).exec();
  }

  async delete(targetCommentId: string, user: User) {
    const currentUser = await this.commentModel
      .find({ _id: user.userId })
      .where('user')
      .equals(user.userId);
    if (!currentUser) {
      throw new ForbiddenException(
        "User doesn't have the permissions to delete a comment",
      );
    }
    return this.commentModel.deleteOne({ _id: targetCommentId }).exec();
  }

  async like(likedCommentPayload: LikeCommentPayload, user: User) {
    const alreadyLiked = await this.likedCommentModel
      .findOneAndDelete()
      .where('user')
      .equals(user.userId)
      .where('comment')
      .equals(likedCommentPayload.comment);
    if (alreadyLiked) {
      return alreadyLiked;
    }
    likedCommentPayload['user'] = user.userId;
    likedCommentPayload['date'] = moment().format();
    const createdLike = new this.likedCommentModel(likedCommentPayload);
    return createdLike.save();
  }
}
