import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  price?: number;
}
