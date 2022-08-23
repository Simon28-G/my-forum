/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/models/users/user.schema';
import { UsersService } from 'src/services/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { DistantStrategy } from './distant.strategy';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService, AuthService, DistantStrategy],
  exports: [AuthService],
})
export class AuthModule {}
