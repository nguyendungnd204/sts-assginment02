import { IsNotEmpty } from "class-validator";

export class TaskReminderDto {
    @IsNotEmpty({ message: 'Task ID should not be empty' })
    taskId: number;

    @IsNotEmpty({ message: 'Task Title should not be empty' })
    taskTitle: string;

    @IsNotEmpty({ message: 'Requested At should not be empty' })
    requestedAt: Date;
}
