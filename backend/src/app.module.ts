import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/users/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://simon:' + process.env.DATABASE_PASSWORD + '@cluster0.57mzfnu.mongodb.net/?retryWrites=true&w=majority',
    ),
    JwtModule,
  ],
  controllers: [UserController, AppController],
  providers: [AuthService, UsersService],
})
export class AppModule {}
