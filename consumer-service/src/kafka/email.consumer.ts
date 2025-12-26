import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { EmailService } from "src/services/email.service";

@Controller()
export class EmailConsumer {
    private readonly logger = new Logger(EmailConsumer.name);

    constructor(
        private readonly emailService: EmailService,
    ) {}

    @MessagePattern('products.created')
    async handleProductCreated(@Payload() data: any)
    {
        try {
            await this.emailService.sendProductCreatedEmail(data);
        } catch (error) {
            this.logger.error(`Consumer: Error processing product created email for product: ${data.name} - ${error.message}`);
            throw error;
        }
    }
}