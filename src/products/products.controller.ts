import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Message } from './products.types';
import { ProductDto } from './dto/product.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): ProductDto[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ProductDto {
    return this.productsService.getById(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto): CreateProductDto {
    return this.productsService.create(createProductDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Message {
    this.productsService.delete(id);

    return { msg: 'Product was deleted!' };
  }

  @Put('change/:id')
  change(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Message {
    const changedProduct = this.productsService.change({
      ...updateProductDto,
      id,
    });

    return {
      msg: !changedProduct
        ? 'Something went wrong!'
        : 'Product was changed successful!',
      val: changedProduct,
    };
  }
}
