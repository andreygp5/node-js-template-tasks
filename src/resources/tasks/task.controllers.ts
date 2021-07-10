import express from 'express';

import { Task } from '../../entities/Task';
import * as tasksService from './task.service';

import { ErrorHandler } from '../../helpers/ErrorHandler';

const getTasks = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const { boardId } = req.params;

  if (!boardId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  const tasks = await tasksService.getAllFromBoard(boardId);
  res.status(200).json(tasks);
};

const getTaskById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  try {
    const desiredTask = await tasksService.getByIdFromBoard(boardId, taskId);
    if (!desiredTask) {
      throw new ErrorHandler(404, 'Task not found');
    }
    res.status(200).json(desiredTask);
  } catch (err) {
    next(err);
  }
};

const createTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  const task: Task = req.body;

  try {
    const createdTask = await tasksService.createTaskOnBoard(boardId, task);
    if (!createdTask) {
      throw new ErrorHandler(400, 'Bad request');
    }
    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  const task: Omit<Task, 'id'> = req.body;

  try {
    const updatedTask = await tasksService.updateTaskOnBoard(
      boardId,
      taskId,
      task,
    );
    if (!updatedTask) {
      throw new ErrorHandler();
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  try {
    await tasksService.deleteTaskFromBoard(boardId, taskId);
    res.status(204).send('The task has been deleted');
  } catch (error) {
    next(error);
  }
};

export {
  getTasks, getTaskById, createTask, updateTask, deleteTask,
};
