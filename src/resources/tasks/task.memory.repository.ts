/* eslint-disable no-shadow */
import Task from './task.model';

import { TASKS } from '../../db/database';
import { ITask } from './task';

import { ErrorHandler } from '../../helpers/ErrorHandler';

/**
 * Get all tasks from board
 *
 * @param {number} boardId Board id, where tasks will be found
 *
 * @returns {Promise<Array<import('./task.model.js').TaskModel>>} Tasks array
 */
const getAllFromBoard = async (boardId: string): Promise<ITask[]> =>
  TASKS.filter((task) => task.boardId === boardId);

/**
 * Get task from board by id
 * If task with this id doesn't exist - returns undefined
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 *
 * @returns {Promise<import('./task.model.js').TaskModel | undefined>} Task instance or undefined
 */
const getByIdFromBoard = async (
  boardId: string,
  taskId: string
): Promise<ITask | undefined> =>
  TASKS.find((task) => task.boardId === boardId && task.id === taskId);

/**
 * Creates task on board
 *
 * @param {number} boardId Board id, where task is stored
 * @param {import('./task.model.js').TaskModel} task Task instance
 *
 * @returns {Promise<import('./task.model.js').TaskModel>} Created task instance
 */
const createTaskOnBoard = async (
  boardId: string,
  task: ITask
): Promise<ITask> => {
  const newTask = new Task({ ...task, boardId });

  TASKS.push(newTask);
  return newTask;
};

/**
 * Update task by id
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 * @param {import('./task.model.js').TaskModel} updatedTask Task instance
 *
 * @returns {Promise<import('./task.model.js').TaskModel>} Updated task instance
 */
const updateTaskOnBoard = async (
  boardId: string,
  taskId: string,
  updatedTask: Omit<ITask, 'id'>
): Promise<ITask> => {
  const task = await getByIdFromBoard(boardId, taskId);
  if (!task) throw new ErrorHandler(400, 'Id is not valid');

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

/**
 * Deletes task by id
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 *
 * @returns {Promise<void>}
 */
const deleteTaskFromBoard = async (
  boardId: string,
  taskId: string
): Promise<void> => {
  const taskIndex = TASKS.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );

  if (taskIndex === -1) {
    throw new ErrorHandler();
  }

  TASKS.splice(taskIndex, 1);
};

/**
 * Update tasks where the user is assigned, when user is deleted
 *
 * @param {number} userId Task assigner id
 *
 * @returns {Promise<void>}
 */
const updateTasksWhereUserAssignee = (userId: string): void => {
  TASKS.forEach((task) => {
    const taskRef = task;
    if (taskRef.userId === userId) taskRef.userId = null;
  });
};

/**
 * Deletes tasks, when board, where tasks are stored, - deleted
 *
 * @param {number} boardId Board id, where task is stored
 *
 * @returns {Promise<void>}
 */
const deleteTasksOnBoardDelete = (boardId: string): void => {
  const tasksIdsToDelete: string[] = [];
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
