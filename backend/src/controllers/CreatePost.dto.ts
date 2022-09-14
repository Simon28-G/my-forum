import { IsAscii, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePostDto {
  @IsNotEmpty()
  @IsAscii()
  title: string;
  @IsNotEmpty()
  @IsAscii()
  text: string;
}
