/* eslint-disable no-shadow */
import { Board } from '../../entities/Board';
import { BoardColumn } from '../../entities/BoardColumn';
import { ErrorHandler } from '../../helpers/ErrorHandler';

import * as columnsService from '../columns/column.service';

/**
 * Get all boards from db
 *
 * @returns {Promise<Array<import('./board.model.js').BoardModel>>}
 * Boards array
 */
const getAll = async (): Promise<Board[]> => {
  const boards = await Board.find({ relations: ['columns'] })
  return boards;
};

/**
 * Get board by id from db
 * If board with this id doesn't exist - returns undefined
 *
 * @param {number} id Desired board id
 *
 * @returns {Promise<import('./board.model.js').BoardModel|undefined>} Board or undefined
 */
const getById = async (id: string): Promise<Board | undefined> => {
  const board = await Board.findOne({ where: { id }, relations: ['columns'] });

  if (!board) {
    throw new ErrorHandler(404, 'Board not found');
  }

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
  try {
    const { columns, title } = board;

    const newBoard = Board.create();

    const columnsList: BoardColumn[] = [];

    for await (const column of columns) {
      const createdColumn = await columnsService.createColumn(column, newBoard);
      columnsList.push(createdColumn);
    }

    newBoard.title = title;
    newBoard.columns = columnsList;

    await newBoard.save();

    return newBoard;
  } catch (error) {
    throw new ErrorHandler(400, error)
  }

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
const updateBoard = async (id: string, updatedBoard: Omit<Board, 'id'>): Promise<Board> => {
  const board = await getById(id);

  if (!board) {
    throw new ErrorHandler(404, 'Id is not valid');
  }

  const { title, columns } = updatedBoard;
  await columnsService.updateColumnsInBoard(columns, board);

  board.title = title;
  await board.save();

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
  const board = await getById(id);

  if (!board) {
    throw new ErrorHandler(404, 'Board not found');
  }

  await columnsService.deleteColumns(board.columns);

  await board.remove();
};

export { getAll, getById, createBoard, updateBoard, deleteBoard };
