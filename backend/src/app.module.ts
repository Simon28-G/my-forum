import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/users/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://simon:plecil7nes@cluster0.57mzfnu.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [UserController, AppController],
  providers: [AuthService, UsersService],
})
export class AppModule {}
