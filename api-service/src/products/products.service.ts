import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCreatedProducer } from 'src/queues/product-created.producer';
import { ProductCreated } from './events/product-created.event';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly productCreatedProducer: ProductCreatedProducer,
    ) {}

    async createProduct(data: CreateProductDto)
    {
        const product = this.productRepository.create(data);
        await this.productRepository.save(product);

        const payload = new ProductCreated(
            product.id,
            product.name,
            product.price,
            product.stock,
            product.category,
        );
        await this.productCreatedProducer.sendProductCreatedEvent(payload);

        return {
            message: 'Product created successfully',
            productId: product.id,
        };
    }
}
