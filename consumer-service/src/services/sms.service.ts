import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class SmsService {
    private readonly logger = new Logger(SmsService.name);

    async sendProductCreatedSms(data: any)
    {
        const delay = Math.floor(Math.random() * 5000) + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        if (Math.random() < 0.1) {
            throw new Error('Simulated SMS sending failure');
        }

        this.logger.log(`Consumer: Sent product created SMS for product: ${data.name} after ${delay} ms`);
    }
}