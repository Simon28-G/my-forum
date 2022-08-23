/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';
import { AuthService } from './auth.service';
import { DistantStrategy } from './distant.strategy';

@Module({
  imports: [AppModule, PassportModule],
  providers: [AuthService, DistantStrategy],
})
export class AuthModule {}
