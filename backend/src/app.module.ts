import { CommentController } from './controllers/comment.controller';
import { CommentsService } from './services/comments.service';
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
import { Comment, CommentSchema } from './models/comments/comment.schema';
import {
  LikedComment,
  LikedCommentSchema,
} from './models/likes/LikedComment.schema.';
import { LikedPost, LikedPostSchema } from './models/likes/LikedPost.schema.';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([
      { name: LikedComment.name, schema: LikedCommentSchema },
    ]),
    MongooseModule.forFeature([
      { name: LikedPost.name, schema: LikedPostSchema },
    ]),
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
  controllers: [
    CommentController,
    PostController,
    UserController,
    AppController,
  ],
  providers: [CommentsService, PostsService, UsersService],
})
export class AppModule {}
