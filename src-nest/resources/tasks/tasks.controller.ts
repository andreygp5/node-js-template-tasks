import {
  Controller, Get, Post, Body, Param, Put, Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get('/:id')
  findOne(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.tasksService.findOne(boardId, id);
  }

  @Put('/:id')
  update(@Param('boardId') boardId: string, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(boardId, id, updateTaskDto);
  }

  @Delete('/:id')
  remove(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.tasksService.remove(boardId, id);
  }
}
