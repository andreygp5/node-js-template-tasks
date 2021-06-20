/* eslint-disable no-shadow */
import { Task } from '../../entities/Task';
import { ErrorHandler } from '../../helpers/ErrorHandler';

/**
 * Get all tasks from board
 *
 * @param {number} boardId Board id, where tasks will be found
 *
 * @returns {Promise<Array<import('./task.model.js').TaskModel>>} Tasks array
 */
const getAllFromBoard = async (boardId: string): Promise<Task[]> => {
  const tasks = await Task.find({ where: { boardId } })
  return tasks;
}

/**
 * Get task from board by id
 * If task with this id doesn't exist - returns undefined
 *
 * @param {number} boardId Board id, where task is stored
 * @param {number} taskId Desired task id
 *
 * @returns {Promise<import('./task.model.js').TaskModel | undefined>} Task instance or undefined
 */
const getByIdFromBoard = async (boardId: string, taskId: string): Promise<Task | undefined> => {
  const task = await Task.findOne({ where: { id: taskId, boardId } })

  if (!task) {
    throw new ErrorHandler(404, 'Task not found');
  }

  return task;
}

/**
 * Creates task on board
 *
 * @param {number} boardId Board id, where task is stored
 * @param {import('./task.model.js').TaskModel} task Task instance
 *
 * @returns {Promise<import('./task.model.js').TaskModel>} Created task instance
 */
const createTaskOnBoard = async (boardId: string, task: Task): Promise<Task> => {
  const newTask = await Task.create({ ...task, boardId });

  await newTask.save();

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
  updatedTask: Omit<Task, 'id'>
): Promise<Task> => {
  const task = await getByIdFromBoard(boardId, taskId);

  if (!task) throw new ErrorHandler(404, 'Id is not valid');

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

  await task.save();

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
  const task = await getByIdFromBoard(boardId, taskId);

  if (!task) {
    throw new ErrorHandler(404, 'Task not found');
  }

  await task.remove();
};

export {
  getAllFromBoard,
  getByIdFromBoard,
  createTaskOnBoard,
  updateTaskOnBoard,
  deleteTaskFromBoard,
};
