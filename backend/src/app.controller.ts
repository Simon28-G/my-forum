import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { DistantAuthGuard } from './auth/distantauth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(DistantAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(process.env.JWT_SECRET);
    return this.authService.login(req.body);
  }
}
