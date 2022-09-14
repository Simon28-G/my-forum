import { IsNotEmpty, isNotEmpty, IsUUID } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetCommentDto {
  @IsNotEmpty()
  @IsUUID()
  id: ObjectId;
}
