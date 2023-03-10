import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
import { Product } from './models/product.entity';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async all(@Query('page') page = 1) {
    return this.productService.paginate(page);
  }

  @Post()
  async create(@Body() body: ProductCreateDto): Promise<Product> {
    return this.productService.create(body);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.productService.findOne({
      where: { id },
    });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ProductUpdateDto) {
    await this.productService.update(id, body);
    return await this.productService.findOne({ where: { id } });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.productService.delete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
