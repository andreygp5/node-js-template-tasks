import * as boardsRepo from './board.memory.repository.js';

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const createBoard = (board) => boardsRepo.createBoard(board);
const updateBoard = (id, updatedBoard) =>
  boardsRepo.updateBoard(id, updatedBoard);
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

export { getAll, getById, createBoard, updateBoard, deleteBoard };
