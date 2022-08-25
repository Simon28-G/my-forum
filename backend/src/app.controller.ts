import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { DistantAuthGuard } from './auth/distantauth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PostsService } from './services/posts.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private postService: PostsService,
  ) {}
  @UseGuards(DistantAuthGuard)
  @Post('auth/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }

  @Post('auth/create')
  async createUser(@Body() req) {
    return this.authService.create(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('home/post/create')
  async createPost(@Body() req) {
    return this.postService.create(req);
  }

  @Post(['/', 'home'])
  async getAll(@Body() req) {
    return this.postService.findAll(req);
  }
}
