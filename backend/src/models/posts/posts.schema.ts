import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from '../users/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: String;

  @Prop()
  text: String;

  @Prop()
  date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const UserSchema = SchemaFactory.createForClass(Post);
