import { IBoard } from '../boards/board';
import { IColumn } from './column';

import Column from './column.model';

/**
 * Creates column
 *
 * @param {import('./column.model.js').ColumnModel} column
 * Column info
 *
 * @returns {Promise<import('./column.model.js').ColumnModel>}
 * Created column instance
 */
const createColumn = async (column: Omit<IColumn, 'id'>): Promise<IColumn> =>
  new Column({ ...column });

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
const updateFields = async (
  newFields: Omit<IColumn, 'id'>,
  column: IColumn
): Promise<IColumn> => {
  const { title, order } = newFields;
  const newColumn = column;

  newColumn.title = title;
  newColumn.order = order;

  return newColumn;
};

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
const getColumnFromBoardById = async (
  columnId: string,
  board: IBoard
): Promise<IColumn | undefined> =>
  board.columns.find((column) => column.id === columnId);

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
const updateColumnsInBoard = async (
  updatedColumns: IColumn[],
  board: IBoard
): Promise<void> => {
  await updatedColumns.forEach(async (updatedColumn) => {
    const columnInBoard = await getColumnFromBoardById(updatedColumn.id, board);
    if (columnInBoard) {
      updateFields(
        {
          title: updatedColumn.title,
          order: updatedColumn.order,
        },
        columnInBoard
      );
    } else {
      board.columns.push(
        await createColumn({
          title: updatedColumn.title,
          order: updatedColumn.order,
        })
      );
    }
  });
};

export {
  createColumn,
  updateFields,
  getColumnFromBoardById,
  updateColumnsInBoard,
};
