/* eslint-disable no-shadow */
import Board from './board.model';

import { BOARDS } from '../../db/database';

import * as columnsService from '../columns/column.service';
import { deleteTasksOnBoardDelete } from '../tasks/task.service';
import { IBoard } from './board';

/**
 * Get all boards from db
 *
 * @returns {Promise<Array<import('./board.model.js').BoardModel>>}
 * Boards array
 */
const getAll = async (): Promise<IBoard[]> => BOARDS;

/**
 * Get board by id from db
 * If board with this id doesn't exist - returns undefined
 *
 * @param {number} id Desired board id
 *
 * @returns {Promise<import('./board.model.js').BoardModel|undefined>} Board or undefined
 */
const getById = async (id: string): Promise<IBoard | undefined> =>
  BOARDS.find((board: IBoard) => board.id === id);

/**
 * Creates board in db with info from request
 *
 * @param {{columns: Array<import('../columns/column.model.js').ColumnModel>, title: string}} board
 * Board data from request
 *
 * @returns {Promise<import('./board.model.js').BoardModel>} Created board instance
 */
const createBoard = async (board: Omit<IBoard, 'id'>): Promise<IBoard> => {
  const { columns, title } = board;
  const newBoard = new Board({ title });

  await columns.forEach(async (column) => {
    newBoard.columns.push(await columnsService.createColumn(column));
  });

  BOARDS.push(newBoard);
  return newBoard;
};

/**
 * Updates board in db with info from request
 *
 * @param {number} id
 * @param {{title: string, columns: Array<import('../columns/column.model.js').ColumnModel>}} updatedBoard
 * Updated board data from request
 *
 * @returns {Promise<import('./board.model.js').BoardModel>} Updated board instance
 */
const updateBoard = async (
  id: string,
  updatedBoard: Omit<IBoard, 'id'>
): Promise<IBoard> => {
  const board = await getById(id);
  if (!board) throw new Error('Id is not valid');

  const { title, columns: updatedColumns } = updatedBoard;

  await columnsService.updateColumnsInBoard(updatedColumns, board);
  board.title = title;

  return board;
};

/**
 * Delete board with specified id from db
 *
 * @param {number} id Desired board id
 *
 * @returns {Promise<void>}
 */
const deleteBoard = async (id: string): Promise<void> => {
  const boardIndex = BOARDS.findIndex((board) => board.id === id);

  BOARDS.splice(boardIndex, 1);
  deleteTasksOnBoardDelete(id);
};

export { getAll, getById, createBoard, updateBoard, deleteBoard };
