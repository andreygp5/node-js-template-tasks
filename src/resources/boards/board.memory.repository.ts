/* eslint-disable no-shadow */
import { Board } from '../../entities/Board';

import * as columnsService from '../columns/column.service';
// import { deleteTasksOnBoardDelete } from '../tasks/task.service';

// import { ErrorHandler } from '../../helpers/ErrorHandler';

/**
 * Get all boards from db
 *
 * @returns {Promise<Array<import('./board.model.js').BoardModel>>}
 * Boards array
 */
const getAll = async (): Promise<Board[]> => Board.find();

/**
 * Get board by id from db
 * If board with this id doesn't exist - returns undefined
 *
 * @param {number} id Desired board id
 *
 * @returns {Promise<import('./board.model.js').BoardModel|undefined>} Board or undefined
 */
const getById = async (id: string): Promise<Board | undefined> => {
  const board = await Board.findOne({ where: { id }});
  return board;
}

/**
 * Creates board in db with info from request
 *
 * @param {{columns: Array<import('../columns/column.model.js').ColumnModel>, title: string}} board
 * Board data from request
 *
 * @returns {Promise<import('./board.model.js').BoardModel>} Created board instance
 */
const createBoard = async (board: Omit<Board, 'id'>): Promise<Board> => {
  const { columns, title } = board;
  const newBoard = await Board.create({ title });

  await columns.forEach(async (column) => {
    newBoard.columns.push(await columnsService.createColumn(column));
  });

  await Board.save(newBoard);
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
  updatedBoard: Omit<Board, 'id'>
): Promise<Board> => {
  const board = await getById(id);
  if (!board) throw new Error('Id is not valid');

  const { title, columns: updatedColumns } = updatedBoard;

  await columnsService.updateColumnsInBoard(updatedColumns, board);
  board.title = title;

  await Board.save(board);

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
  await Board.delete(id);
};

export { getAll, getById, createBoard, updateBoard, deleteBoard };
