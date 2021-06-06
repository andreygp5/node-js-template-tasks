import { IBoard } from '../boards/board';
import { IColumn } from './column';

import * as columnsRepo from './column.memory.repository';

/**
 * Creates column
 *
 * @param {import('./column.model.js').ColumnModel} column
 * Column info
 *
 * @returns {Promise<import('./column.model.js').ColumnModel>}
 * Created column instance
 */
const createColumn = (column: Omit<IColumn, 'id'>): Promise<IColumn> =>
  columnsRepo.createColumn(column);

/**
 * Updates column
 *
 * @param {{title: string, order: number}} newFields
 * @param {import('./column.model.js').ColumnModel} column
 * Column instance
 *
 * @returns {Promise<import('./column.model.js').ColumnModel>}
 * Updated column instance
 */
const updateFields = (
  newFields: Omit<IColumn, 'id'>,
  column: IColumn
): Promise<IColumn> => columnsRepo.updateFields(newFields, column);

/**
 * Get column by id from db
 * If column doesn't exist - returns undefined
 *
 * @param {number} columnId Desired column id
 * @param {import('../boards/board.model.js').BoardModel} board
 * Board instance, where the column is being found
 *
 * @returns {Promise<import('./column.model.js').ColumnModel | undefined>}
 * Column or undefined
 */
const getColumnFromBoardById = (
  columnId: string,
  board: IBoard
): Promise<IColumn | undefined> =>
  columnsRepo.getColumnFromBoardById(columnId, board);

/**
 * Updates columns on board or creates new columns if column doesn't exist
 *
 * @param {Array<import('./column.model.js').ColumnModel>} updatedColumns
 * Array of columns, which will be updated
 * @param {import('../boards/board.model.js').BoardModel} board
 * Board instance on which columns will be updated
 *
 * @returns {Promise<void>}
 */
const updateColumnsInBoard = (
  updatedColumns: IColumn[],
  board: IBoard
): Promise<void> => columnsRepo.updateColumnsInBoard(updatedColumns, board);

export {
  createColumn,
  updateFields,
  getColumnFromBoardById,
  updateColumnsInBoard,
};