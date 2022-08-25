import { PostsService } from './services/posts.service';
import { PostController } from './controllers/post.controller';
import { AuthModule } from './auth/auth.module';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/users/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Post, PostSchema } from './models/posts/posts.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri:
            'mongodb+srv://simon:' +
            process.env.DATABASE_PASSWORD +
            '@cluster0.57mzfnu.mongodb.net/MyForum?retryWrites=true&w=majority',
        };
      },
    }),
    JwtModule,
  ],
  controllers: [PostController, UserController, AppController],
  providers: [PostsService, UsersService],
})
export class AppModule {}
