/* eslint-disable no-shadow */
import Task from './task.model.js';

import { TASKS } from '../../db/database.js';

/**
 * Get all tasks from board
 *
 * @param {number} boardId Board id, where tasks will be found
 *
 * @returns {Promise<Array<import('./task.model.js').TaskModel>>} Tasks array
 */
const getAllFromBoard = async (boardId) =>
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
const getByIdFromBoard = async (boardId, taskId) =>
  TASKS.find((task) => task.boardId === boardId && task.id === taskId);

/**
 * Creates task on board
 *
 * @param {number} boardId Board id, where task is stored
 * @param {import('./task.model.js').TaskModel} task Task instance
 *
 * @returns {Promise<import('./task.model.js').TaskModel>} Created task instance
 */
const createTaskOnBoard = async (boardId, task) => {
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

/**
 * Deletes task by id
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 *
 * @returns {Promise<void>}
 */
const deleteTaskFromBoard = async (boardId, taskId) => {
  const taskIndex = TASKS.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );

  TASKS.splice(taskIndex, 1);
};

/**
 * Update tasks where the user is assigned, when user is deleted
 *
 * @param {number} userId Task assigner id
 *
 * @returns {Promise<void>}
 */
const updateTasksWhereUserAssignee = (userId) => {
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
