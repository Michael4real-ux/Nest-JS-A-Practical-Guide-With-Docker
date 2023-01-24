import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoleUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
