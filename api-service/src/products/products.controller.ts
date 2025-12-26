import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService) 
  {}
  
  @Post()
  async createProduct(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) data: CreateProductDto) {
    return this.productsService.createProduct(data);
  }
}
