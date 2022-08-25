import { IsNotEmpty, isNotEmpty, IsUUID } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: ObjectId;
}
