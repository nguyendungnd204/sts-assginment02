import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class TaskReminderService {
    private readonly logger = new Logger(TaskReminderService.name);

    async handleTaskReminder(payload: {
        taskId: number;
        taskTitle: string;
        requestedAt: Date;
    }) {
        this.logger.log(`Consumer: Received task reminder for taskId: ${payload.taskId}, taskTitle: ${payload.taskTitle}, requestedAt: ${payload.requestedAt}`);

        const delay = Math.floor(Math.random() * 5000) + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        this.logger.log(`Consumer: Processed task reminder for taskId: ${payload.taskId} after ${delay} ms`);
    }
}