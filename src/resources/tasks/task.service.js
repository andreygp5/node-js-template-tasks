import * as tasksRepo from './task.memory.repository.js';

const getAllFromBoard = (boardId) => tasksRepo.getAllFromBoard(boardId);
const getByIdFromBoard = (boardId, taskId) =>
  tasksRepo.getByIdFromBoard(boardId, taskId);
const createTaskOnBoard = (boardId, task) =>
  tasksRepo.createTaskOnBoard(boardId, task);
const updateTaskOnBoard = (boardId, taskId, task) =>
  tasksRepo.updateTaskOnBoard(boardId, taskId, task);
const deleteTaskFromBoard = (boardId, taskId) =>
  tasksRepo.deleteTaskFromBoard(boardId, taskId);
const updateTasksWhereUserAssignee = (userId) =>
  tasksRepo.updateTasksWhereUserAssignee(userId);
const deleteTasksOnBoardDelete = (boardId) =>
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
