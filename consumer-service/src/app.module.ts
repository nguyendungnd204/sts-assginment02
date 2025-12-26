import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TaskReminderConsumer } from './kafka/task-reminder.consumer';
import { TaskReminderService } from './services/task-reminder.service';
import { EmailConsumer } from './kafka/email.consumer';
import { SmsConsumer } from './kafka/sms.consumer';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    AppController,
    TaskReminderConsumer,
    EmailConsumer,
    SmsConsumer,
  ],
  providers: [
    AppService,
    TaskReminderService,
    EmailService,
    SmsService,
  ],
})
export class AppModule {}
