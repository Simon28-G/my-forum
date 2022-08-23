import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: String;

  @Prop()
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
