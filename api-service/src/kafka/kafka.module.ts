import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'KAFKA_SERVICE',
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'api-service',
                            brokers: [configService.get<string>('KAFKA_BROKER') || 'localhost:9093'],
                        },
                        producer: {
                            allowAutoTopicCreation: true,
                        }
                    }
                }),
                inject: [ConfigService],
            }
        ]),
    ],
    exports: [ClientsModule],
})
    
export class KafkaModule {}
