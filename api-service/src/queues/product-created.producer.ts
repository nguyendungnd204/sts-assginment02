import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ProductCreated } from "src/products/events/product-created.event";

@Injectable()
export class ProductCreatedProducer implements OnModuleInit {
    private readonly logger = new Logger(ProductCreatedProducer.name);

    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}

    async onModuleInit()
    {
        await this.kafkaClient.connect();
    }

    async sendProductCreatedEvent(payload: ProductCreated)
    {
        await this.kafkaClient.emit('products.created',payload);
        this.logger.log(`Producer: Sent product created event from producer for product: ${payload.name}`);
    }
}