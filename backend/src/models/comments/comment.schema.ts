import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Post } from '../posts/posts.schema';
import { User } from '../users/user.schema';

export type CommentDocument = Comment & Document;

@Schema({
  collection: 'Comments',
  versionKey: false,
  virtuals: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Comment {
  @Prop()
  text: string;

  @Prop()
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.virtual('likes', {
  ref: 'LikedComment',
  localField: '_id',
  foreignField: 'comment',
});
