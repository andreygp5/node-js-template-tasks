import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  create(boardId: string, createTaskDto: CreateTaskDto) {
    return this.tasksRepository.createTaskOnBoard(boardId, createTaskDto);
  }

  findAll(boardId: string) {
    return this.tasksRepository.getAllTasksFromBoard(boardId);
  }

  findOne(boardId: string, id: string) {
    return this.tasksRepository.getByIdFromBoard(boardId, id);
  }

  update(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.updateTaskOnBoard(boardId, id, updateTaskDto);
  }

  remove(boardId: string, id: string) {
    return this.tasksRepository.deleteTaskFromBoard(boardId, id);
  }
}
