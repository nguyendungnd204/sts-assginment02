import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TaskReminderProducer } from 'src/queues/task-reminder.producer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    KafkaModule
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskReminderProducer
  ],
})
export class TasksModule {}
