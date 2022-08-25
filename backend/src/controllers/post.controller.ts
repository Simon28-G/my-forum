/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller } from '@nestjs/common';
import { CreatePostDto } from './CreatePost.dto';
import { GetPostDto } from './GetPost.dto';

@Controller()
export class PostController {
  async create(@Body() createUserDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async getOne(@Body() GetUserDto: GetPostDto) {
    return 'This action gets a post';
    }
    
    async getAll(@Body() GetPostsDto: GetPostDto[]) {
        return 'This action gets all of the posts';
    }
}
