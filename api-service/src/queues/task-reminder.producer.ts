import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { TaskReminderDto } from "src/tasks/dto/task-reminder.dto";

@Injectable()
export class TaskReminderProducer implements OnModuleInit {
    private readonly logger = new Logger(TaskReminderProducer.name);

    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}

    async onModuleInit() {
        await this.kafkaClient.connect();
    }

    async sendReminderEvent(payload: TaskReminderDto)
    {
        await this.kafkaClient.emit('task-reminder',payload);
        this.logger.log(`Sent task reminder event from producer for taskId: ${payload.taskId}`);
    }
}