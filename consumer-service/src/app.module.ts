import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TaskReminderConsumer } from './kafka/task-reminder.consumer';
import { TaskReminderService } from './services/task-reminder.service';

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
  ],
  providers: [
    AppService,
    TaskReminderService, // ← Add service here
  ],
})
export class AppModule {}
