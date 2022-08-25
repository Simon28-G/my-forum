import {
  IsAlphanumeric,
  IsAscii,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  @IsAscii()
  username: string;
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  @IsAlphanumeric()
  password: string;
}
