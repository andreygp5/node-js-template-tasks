/* eslint-disable no-shadow */
import Task from './task.model.js';

import { TASKS } from '../../db/database.js';

const getAllFromBoard = async (boardId) =>
  TASKS.filter((task) => task.boardId === boardId);
const getByIdFromBoard = async (boardId, taskId) =>
  TASKS.find((task) => task.boardId === boardId && task.id === taskId);
const createTaskOnBoard = async (boardId, task) => {
  const newTask = new Task({ ...task, boardId });

  TASKS.push(newTask);
  return newTask;
};
const updateTaskOnBoard = async (boardId, taskId, updatedTask) => {
  const task = await getByIdFromBoard(boardId, taskId);

  const {
    title,
    order,
    description,
    userId,
    boardId: updatedBoardId,
    columnId,
  } = updatedTask;
  task.title = title;
  task.order = order;
  task.description = description;
  task.userId = userId;
  task.boardId = updatedBoardId;
  task.columnId = columnId;

  return task;
};
const deleteTaskFromBoard = async (boardId, taskId) => {
  const taskIndex = TASKS.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );

  TASKS.splice(taskIndex, 1);
};
const updateTasksWhereUserAssignee = (userId) => {
  TASKS.forEach((task) => {
    const taskRef = task;
    if (taskRef.userId === userId) taskRef.userId = null;
  });
};
const deleteTasksOnBoardDelete = (boardId) => {
  const tasksIdsToDelete = [];
  TASKS.forEach((task) => {
    if (task.boardId === boardId) tasksIdsToDelete.push(task.id);
  });
  tasksIdsToDelete.forEach((taskId) => deleteTaskFromBoard(boardId, taskId));
};

export {
  getAllFromBoard,
  getByIdFromBoard,
  createTaskOnBoard,
  updateTaskOnBoard,
  deleteTaskFromBoard,
  updateTasksWhereUserAssignee,
  deleteTasksOnBoardDelete,
};
