import { IsAscii, IsNotEmpty, IsUUID } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetPostDto {
  @IsNotEmpty()
  @IsAscii()
  title: string;
  @IsNotEmpty()
  @IsAscii()
  text: string;
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @IsAscii()
  user: string;
}
