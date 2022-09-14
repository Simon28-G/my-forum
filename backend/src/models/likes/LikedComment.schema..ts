import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Comment } from '../comments/comment.schema';
import { User } from '../users/user.schema';

export type LikedCommentDocument = LikedComment & Document;

@Schema({ collection: 'LikedComments', versionKey: false })
export class LikedComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comment: Comment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop()
  date: Date;
}

export const LikedCommentSchema = SchemaFactory.createForClass(LikedComment);
