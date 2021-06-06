import express from 'express';
import { ITask } from './task';

import * as tasksService from './task.service';

const getTasks = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  const tasks = await tasksService.getAllFromBoard(boardId);
  res.status(200).json(tasks);
};

const getTaskById = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  try {
    const desiredTask = await tasksService.getByIdFromBoard(boardId, taskId);
    if (desiredTask) {
      res.status(200).json(desiredTask);
    } else {
      res.status(404).json('Task not found');
    }
  } catch {
    res.status(404).send('Task not found');
  }
};

const createTask = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  const task: ITask = req.body;

  try {
    const createdTask = await tasksService.createTaskOnBoard(boardId, task);
    res.status(201).json(createdTask);
  } catch {
    res.status(400).send('Bad request');
  }
};

const updateTask = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  const task: Omit<ITask, 'id'> = req.body;

  try {
    const updatedTask = await tasksService.updateTaskOnBoard(
      boardId,
      taskId,
      task
    );
    res.status(200).json(updatedTask);
  } catch {
    res.status(400).send('Bad request');
  }
};

const deleteTask = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  try {
    await tasksService.deleteTaskFromBoard(boardId, taskId);
    res.status(204).send('The task has been deleted');
  } catch {
    res.status(404).send('Task not found');
  }
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
