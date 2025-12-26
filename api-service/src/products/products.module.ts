import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCreatedProducer } from 'src/queues/product-created.producer';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    KafkaModule
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductCreatedProducer,
  ],
})
export class ProductsModule {}
