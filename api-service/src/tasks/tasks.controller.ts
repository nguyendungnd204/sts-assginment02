import { Controller, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService) {}

  @Get('seed')
  async seedTasks() {
    return this.tasksService.seedTasks();
  }

  @Post(':id/remind')
  @HttpCode(202)
  async remindTask(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.tasksService.scheduleReminder(id);
  }
}
