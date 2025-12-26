import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  const emailConsumer = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'email-consumer',
          brokers: [process.env.KAFKA_BROKER || 'localhost:9093'],
        },
        consumer: {
          groupId: 'email-notification-group',
        },
      },
    },
  );

  const smsConsumer = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'sms-consumer',
          brokers: [process.env.KAFKA_BROKER || 'localhost:9093'],
        },
        consumer: {
          groupId: 'sms-notification-group',
        },
      },
    },
  );

  const taskReminderConsumer = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'reminder-consumer',
          brokers: [process.env.KAFKA_BROKER || 'localhost:9093'],
        },
        consumer: {
          groupId: 'task-reminder-consumer-group',
        },
      },
    },
  );

  await emailConsumer.listen();
  await smsConsumer.listen();
  await taskReminderConsumer.listen();

  console.log('🚀 Consumer service is listening to Kafka with 3 separate consumer groups...');
}
bootstrap();
