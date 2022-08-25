import { ObjectId } from 'mongoose';

export class CreatePostDto {
  title: string;
  text: string;
  date: Date;
  id_user: ObjectId;
}
