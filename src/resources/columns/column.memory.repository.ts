import { Board } from '../../entities/Board';
import { BoardColumn } from '../../entities/BoardColumn';

/**
 * Creates column
 *
 * @param {import('./column.model.js').ColumnModel} column
 * Column info
 *
 * @returns {Promise<import('./column.model.js').ColumnModel>}
 * Created column instance
 */
const createColumn = async (column: Omit<BoardColumn, 'id'>): Promise<BoardColumn> => {
  const newColumn = await BoardColumn.create(column);
  await BoardColumn.save(newColumn);

  return newColumn;
}

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
  newFields: Omit<BoardColumn, 'id'>,
  column: BoardColumn
): Promise<BoardColumn> => {
  await BoardColumn.update(newFields, column)
  await BoardColumn.save(column);

  return column;
};

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
  updatedColumns: BoardColumn[],
  board: Board,
): Promise<void> => {
  await updatedColumns.forEach(async (updatedColumn) => {
    const columnToUpdate = await BoardColumn.findOne(updatedColumn);

    if (columnToUpdate) {
      updateFields(updatedColumn, columnToUpdate);
    } else {
      const newColumn = await BoardColumn.create(updatedColumn);
      board.columns.push(newColumn);
    }
  });
};

export {
  createColumn,
  updateFields,
  updateColumnsInBoard,
};
