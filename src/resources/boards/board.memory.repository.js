import Board from './board.model.js';

import { BOARDS } from '../../db/database.js';

const getAll = async () => BOARDS;
const getById = async (id) => BOARDS.find((board) => board.id === id);
const createBoard = async (board) => {
  const newBoard = new Board({ ...board });
  BOARDS.push(newBoard);
  return newBoard;
};
const updateBoard = async (id, updatedBoard) => {
  const board = await getById(id);
  const { title, columns } = updatedBoard;

  board.title = title;
  board.columns = columns;

  return board;
};
const deleteBoard = async (id) => {
  const boardIndex = BOARDS.findIndex((board) => board.id === id);

  BOARDS.splice(boardIndex, 1);
};

export { getAll, getById, createBoard, updateBoard, deleteBoard };
