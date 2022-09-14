import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Post } from '../posts/posts.schema';
import { User } from '../users/user.schema';

export type LikedPostDocument = LikedPost & Document;

@Schema({ collection: 'LikedPosts', versionKey: false })
export class LikedPost {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  date: Date;
}

export const LikedPostSchema = SchemaFactory.createForClass(LikedPost);
