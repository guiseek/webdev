import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
