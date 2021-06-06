import { IBoard } from './board';
import * as boardsRepo from './board.memory.repository';

/**
 * Get all boards from db
 *
 * @returns {Array<Promise<import('./board.model.js').BoardModel>>}
 * Boards array
 */
const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

/**
 * Get board by id from db
 * If board with this id doesn't exist - returns undefined
 *
 * @param {number} id Desired board id
 *
 * @returns {Promise<import('./board.model.js').BoardModel|undefined>} Board or undefined
 */
const getById = (id: string): Promise<IBoard | undefined> =>
  boardsRepo.getById(id);

/**
 * Creates board in db with info from request
 *
 * @param {{columns: Array<import('../columns/column.model.js').ColumnModel>, title: string}} board
 * Board data from request
 *
 * @returns {Promise<import('./board.model.js').BoardModel>} Created board instance
 */
const createBoard = (board: Omit<IBoard, 'id'>): Promise<IBoard> =>
  boardsRepo.createBoard(board);

/**
 * Updates board in db with info from request
 *
 * @param {number} id
 * @param {{title: string, columns: Array<import('../columns/column.model.js').ColumnModel>}} updatedBoard
 * Updated board data from request
 *
 * @returns {Promise<import('./board.model.js').BoardModel>} Updated board instance
 */
const updateBoard = (
  id: string,
  updatedBoard: Omit<IBoard, 'id'>
): Promise<IBoard> => boardsRepo.updateBoard(id, updatedBoard);

/**
 * Delete board with specified id from db
 *
 * @param {number} id Desired board id
 *
 * @returns {Promise<void>}
 */
const deleteBoard = (id: string): Promise<void> => boardsRepo.deleteBoard(id);

export { getAll, getById, createBoard, updateBoard, deleteBoard };