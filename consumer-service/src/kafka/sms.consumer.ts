import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SmsService } from "src/services/sms.service";

@Controller()
export class SmsConsumer {
    private readonly logger = new Logger(SmsConsumer.name);

    constructor(
        private readonly smsService: SmsService,
    ) {}

    @MessagePattern('products.created')
    async handleProductCreated(@Payload() data: any)
    {
        try {
            await this.smsService.sendProductCreatedSms(data);
        } catch (error) {
            this.logger.error(`Consumer: Error processing product created SMS for product: ${data.name} - ${error.message}`);
            throw error;
        }
    }
}