import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { DistantAuthGuard } from './auth/distantauth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './auth/user.decorator';
import { CreateUserDto } from './controllers/CreateUser.dto';
import { User as CurrentUser } from './models/Types/User';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(DistantAuthGuard)
  @Post('auth/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }

  @Post('auth/create')
  async createUser(@Body() req: CreateUserDto) {
    return this.authService.create(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user: CurrentUser) {
    return user;
  }
}
