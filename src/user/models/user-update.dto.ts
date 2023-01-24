import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  first_name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  last_name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  role_id?: number;
}
