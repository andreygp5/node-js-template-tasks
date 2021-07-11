import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getAllTasksFromBoard(boardId: string): Promise<Task[]> {
    const tasks = await Task.find({ where: { boardId } });
    return tasks;
  }

  async getByIdFromBoard(boardId: string, taskId: string): Promise<Task> {
    const task = await Task.findOne({ where: { id: taskId, boardId } });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async createTaskOnBoard(boardId: string, task: CreateTaskDto): Promise<Task> {
    const newTask = await Task.create({ ...task, boardId });

    await newTask.save();

    return newTask;
  }

  async updateTaskOnBoard(
    boardId: string, taskId: string, updatedTask: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getByIdFromBoard(boardId, taskId);

    await this.update(task, updatedTask);
    await task.reload();

    return task;
  }

  async deleteTaskFromBoard(boardId: string, taskId: string): Promise<void> {
    const task = await this.getByIdFromBoard(boardId, taskId);

    await task.remove();
  }
}
