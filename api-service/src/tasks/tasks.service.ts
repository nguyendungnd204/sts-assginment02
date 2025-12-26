import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ){}

    async seedTasks() {
        const tasks = [
            { title: 'Task 1', description: 'Description for Task 1' },
            { title: 'Task 2', description: 'Description for Task 2' },
            { title: 'Task 3', description: 'Description for Task 3' },
            { title: 'Task 4', description: 'Description for Task 4' },
            { title: 'Task 5', description: 'Description for Task 5' },
        ];

        for (const data of tasks) {
            const task = this.taskRepository.create(data);
            await this.taskRepository.save(task);
        };

        return { message: 'Tasks seeded successfully' };
    }

    
}
