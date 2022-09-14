import { IsAscii, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsAscii()
  text: string;
  @IsNotEmpty()
  @IsAscii()
  post: string;
}
