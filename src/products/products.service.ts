import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private products: Array<ProductDto> = [];

  getAll(): ProductDto[] {
    return this.products;
  }

  getById(id: string): ProductDto {
    return this.products.find((p: ProductDto) => p.id === id);
  }

  create(createProductDto: CreateProductDto): CreateProductDto {
    const newProduct: CreateProductDto = {
      ...createProductDto,
      id: Date.now().toString(),
    };

    this.products.push(newProduct);

    return newProduct;
  }

  delete(id: string): void {
    this.products = this.products.filter((p: ProductDto) => p.id !== id);

    return;
  }

  /*
  |
  | fP -> Found product : ProductDto
  | cP -> Changed product : ProductDto
  |
  */

  change(product: ProductDto): ProductDto {
    const fP: ProductDto = this.products.find(
      (p: ProductDto) => p.id === product.id,
    );
    const idx: number = this.products.indexOf(fP);
    console.log(idx);
    if (idx == -1) {
      return null;
    }

    const cP: ProductDto = {
      ...fP,
      title: product.title,
      price: product.price,
    };

    this.products[idx] = cP;

    return cP;
  }
}
