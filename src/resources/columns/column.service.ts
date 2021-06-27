import { Board } from '../../entities/Board';
import { BoardColumn } from '../../entities/BoardColumn';

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
const createColumn = (column: Omit<BoardColumn, 'id'>, board: Board): Promise<BoardColumn> =>
  columnsRepo.createColumn(column, board);

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
  newFields: Omit<BoardColumn, 'id'>,
  column: BoardColumn
): Promise<BoardColumn> => columnsRepo.updateFields(newFields, column);

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
const updateColumnsInBoard = (updatedColumns: BoardColumn[], board: Board): Promise<BoardColumn[]> =>
  columnsRepo.updateColumnsInBoard(updatedColumns, board);

const deleteColumns = async (columns: BoardColumn[]): Promise<void> => columnsRepo.deleteColumns(columns);

export {
  createColumn,
  updateFields,
  updateColumnsInBoard,
  deleteColumns,
};
