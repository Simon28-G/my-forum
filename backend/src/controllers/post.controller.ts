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
  Put,
  UseGuards,
} from '@nestjs/common';
import { userInfo } from 'os';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { User as CurrentUser } from 'src/models/Types/User';
import { PostsService } from 'src/services/posts.service';
import { CreatePostDto } from './CreatePost.dto';
import { GetPostDto } from './GetPost.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @User() user: CurrentUser,
  ) {
    return this.postService.create(createPostDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id: string, @User() user: CurrentUser) {
    return this.postService.delete(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() payload, @User() user: CurrentUser) {
    return this.postService.update(payload, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like')
  async like(@Body() payload: LikePostPayload, @User() user: CurrentUser) {
    return this.postService.like(payload, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/like/:id')
  async isPostLikedByUser(@Param('id') id: string, @User() user: CurrentUser) {
    return this.postService.isPostLikedByUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/count')
  async getCountAllPosts(@User() user: CurrentUser) {
    return this.postService.getCountAllPosts(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/like/count')
  async getCountLikesByPosts(@User() user: CurrentUser) {
    return this.postService.getCountLikesByPosts(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/weekly')
  async getPostsByWeek(@User() user: CurrentUser) {
    return this.postService.getPostsByWeek(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/like/weekly')
  async getLikesByWeek(@User() user: CurrentUser) {
    return this.postService.getLikesByWeek(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/contributors')
  async getBiggestContributors() {
    return this.postService.getBiggestContributors();
  }
}
