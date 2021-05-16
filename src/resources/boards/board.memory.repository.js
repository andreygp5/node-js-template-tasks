/* eslint-disable no-shadow */
import Board from './board.model.js';

import { BOARDS } from '../../db/database.js';

import * as columnsService from '../columns/column.service.js';

const getAll = async () => BOARDS;
const getById = async (id) => BOARDS.find((board) => board.id === id);
const createBoard = async (board) => {
  const { columns, title } = board;
  const newBoard = new Board({ title });

  await columns.forEach(async (column) => {
    newBoard.columns.push(await columnsService.createColumn(column));
  });

  BOARDS.push(newBoard);
  return newBoard;
};
const updateBoard = async (id, updatedBoard) => {
  const board = await getById(id);
  const { title, columns: updatedColumns } = updatedBoard;

  await columnsService.updateColumnsInBoard(updatedColumns, board);
  board.title = title;

  return board;
};
const deleteBoard = async (id) => {
  const boardIndex = BOARDS.findIndex((board) => board.id === id);

  BOARDS.splice(boardIndex, 1);
};

export { getAll, getById, createBoard, updateBoard, deleteBoard };
