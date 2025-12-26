import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    async sendProductCreatedEmail(data: any) 
    {
        const delay = Math.floor(Math.random() * 5000) + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        if (Math.random() < 0.1) {
            throw new Error('Simulated email sending failure');
        }

        this.logger.log(`Consumer: Sent product created email for product: ${data.name} after ${delay} ms`);
    }
}