import { ITask } from './task';
import * as tasksRepo from './task.memory.repository';

/**
 * Get all tasks from board
 *
 * @param {number} boardId Board id, where tasks will be found
 *
 * @returns {Promise<Array<import('./task.model.js').TaskModel>>} Tasks array
 */
const getAllFromBoard = (boardId: string): Promise<ITask[]> =>
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
): Promise<ITask | undefined> => tasksRepo.getByIdFromBoard(boardId, taskId);

/**
 * Creates task on board
 *
 * @param {number} boardId Board id, where task is stored
 * @param {import('./task.model.js').TaskModel} task Task instance
 *
 * @returns {Promise<import('./task.model.js').TaskModel>} Created task instance
 */
const createTaskOnBoard = (boardId: string, task: ITask): Promise<ITask> =>
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
  task: Omit<ITask, 'id'>
): Promise<ITask> => tasksRepo.updateTaskOnBoard(boardId, taskId, task);

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

/**
 * Update tasks where the user is assigned, when user is deleted
 *
 * @param {number} userId Task assigner id
 *
 * @returns {Promise<void>}
 */
const updateTasksWhereUserAssignee = (userId: string): void =>
  tasksRepo.updateTasksWhereUserAssignee(userId);

/**
 * Deletes tasks, when board, where tasks are stored, - deleted
 *
 * @param {number} boardId Board id, where task is stored
 *
 * @returns {Promise<void>}
 */
const deleteTasksOnBoardDelete = (boardId: string): void =>
  tasksRepo.deleteTasksOnBoardDelete(boardId);

export {
  getAllFromBoard,
  getByIdFromBoard,
  createTaskOnBoard,
  updateTaskOnBoard,
  deleteTaskFromBoard,
  updateTasksWhereUserAssignee,
  deleteTasksOnBoardDelete,
};
