import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TaskReminderService } from "../services/task-reminder.service";

@Controller()
export class TaskReminderConsumer {
    private readonly logger = new Logger(TaskReminderConsumer.name);
    constructor(
        private readonly reminderService: TaskReminderService,
    ) {}

    @MessagePattern('task-reminder')
    async handleReminder(@Payload() data: any)
    {
        try {
            await this.reminderService.handleTaskReminder(data);
            this.logger.log(`Consumer: Processed task reminder for taskId: ${data.taskId}`);
        } catch (error) {
            this.logger.error(`Consumer: Error processing task reminder for taskId: ${data.taskId} - ${error.message}`);
        }
        
    }

    private handleError(payload: any, error: Error, sourceTopic: string)
    {
        
    }
}