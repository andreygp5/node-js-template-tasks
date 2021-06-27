import { Task } from '../../entities/Task';
import * as tasksRepo from './task.memory.repository';

/**
 * Get all tasks from board
 *
 * @param {number} boardId Board id, where tasks will be found
 *
 * @returns {Promise<Array<import('./task.model.js').TaskModel>>} Tasks array
 */
const getAllFromBoard = (boardId: string): Promise<Task[]> =>
  tasksRepo.getAllFromBoard(boardId);

/**
 * Get task from board by id
 * If task with this id doesn't exist - returns undefined
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 *
 * @returns {Promise<import('./task.model.js').TaskModel | undefined>} Task instance or undefined
 */
const getByIdFromBoard = (
  boardId: string,
  taskId: string
): Promise<Task | undefined> => tasksRepo.getByIdFromBoard(boardId, taskId);

/**
 * Creates task on board
 *
 * @param {number} boardId Board id, where task is stored
 * @param {import('./task.model.js').TaskModel} task Task instance
 *
 * @returns {Promise<import('./task.model.js').TaskModel>} Created task instance
 */
const createTaskOnBoard = (boardId: string, task: Task): Promise<Task> =>
  tasksRepo.createTaskOnBoard(boardId, task);

/**
 * Update task by id
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 * @param {import('./task.model.js').TaskModel} updatedTask Task instance
 *
 * @returns {Promise<import('./task.model.js').TaskModel>} Updated task instance
 */
const updateTaskOnBoard = (
  boardId: string,
  taskId: string,
  task: Omit<Task, 'id'>
): Promise<Task> => tasksRepo.updateTaskOnBoard(boardId, taskId, task);

/**
 * Deletes task by id
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 *
 * @returns {Promise<void>}
 */
const deleteTaskFromBoard = (boardId: string, taskId: string): Promise<void> =>
  tasksRepo.deleteTaskFromBoard(boardId, taskId);

export {
  getAllFromBoard,
  getByIdFromBoard,
  createTaskOnBoard,
  updateTaskOnBoard,
  deleteTaskFromBoard,
};
