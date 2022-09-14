/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { User as CurrentUser } from 'src/models/Types/User';
import { CommentsService } from 'src/services/comments.service';
import { PostsService } from 'src/services/posts.service';
import { CreateCommentDto } from './CreateComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentsService) {}

  @Get()
  async getAll(@User() user?: CurrentUser) {
    return this.commentService.findAll(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: CurrentUser,
  ) {
    return this.commentService.create(createCommentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id: string, @User() user: CurrentUser) {
    return this.commentService.delete(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() payload, @User() user: CurrentUser) {
    return this.commentService.update(payload, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like')
  async like(@Body() payload: LikeCommentPayload, @User() user: CurrentUser) {
    return this.commentService.like(payload, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/like/comment/:id')
  async isCommentLikedByUser(
    @Param('id') id: string,
    @User() user: CurrentUser,
  ) {
    return this.commentService.isCommentLikedByUser(id, user);
  }
}
