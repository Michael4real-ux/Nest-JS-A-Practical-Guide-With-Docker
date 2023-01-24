import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  price: number;
}
