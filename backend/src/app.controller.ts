import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DistantAuthGuard } from './auth/distantauth.guard';

@Controller()
export class AppController {
  @UseGuards(DistantAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
