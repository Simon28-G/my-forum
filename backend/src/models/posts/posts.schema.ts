import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { LikedPost } from '../likes/LikedPost.schema.';
import { User } from '../users/user.schema';

export type PostDocument = Post & Document;

@Schema({
  collection: 'Posts',
  versionKey: false,
  virtuals: true,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Post {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  likedByMe: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });
PostSchema.virtual('likes', {
  ref: 'LikedPost',
  localField: '_id',
  foreignField: 'post',
});
