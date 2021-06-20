import validate from 'uuid-validate';
import { Board } from '../../entities/Board';
import { BoardColumn } from '../../entities/BoardColumn';
import { ErrorHandler } from '../../helpers/ErrorHandler';

/**
 * Creates column
 *
 * @param {import('./column.model.js').ColumnModel} column
 * Column info
 *
 * @returns {Promise<import('./column.model.js').ColumnModel>}
 * Created column instance
 */
const createColumn = async (column: Omit<BoardColumn, 'id'>, _board: Board): Promise<BoardColumn> => {
  const newColumn = await BoardColumn.create(column);
  // newColumn.board = board;
  // console.log(JSON.stringify(newColumn) + 'createColumn');
  await newColumn.save();
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
  const { title, order } = newFields;

  column.title = title;
  column.order = order;

  await column.save();

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
const updateColumnsInBoard = async (updatedColumns: BoardColumn[], board: Board): Promise<BoardColumn[]> => {
  try {
    return updatedColumns.reduce(async (columns, updatedColumn) => {
      const columnsCopy = await columns;

      if (!validate(updatedColumn.id, 4)) {
        const { title, order } = updatedColumn;
        const newColumn = await BoardColumn.create({ title, order });
        newColumn.board = board;
        await newColumn.save();
        columnsCopy.push(newColumn);

        console.log(`${JSON.stringify(columnsCopy)} -- ID IS NOT VALID !!!!!!!!!`);

        return columnsCopy;
      }

      const columnToUpdate = await BoardColumn.findOne({ where: { id: updatedColumn.id } });

      if (!columnToUpdate) {
        const newColumn = await BoardColumn.create(updatedColumn);
        newColumn.board = board;
        await newColumn.save();
        columnsCopy.push(newColumn);

        return columnsCopy;
      }

      await updateFields(updatedColumn, columnToUpdate);

      return columnsCopy;
    }, Promise.resolve(<Array<BoardColumn>>[]));
  } catch (error) {
    throw new ErrorHandler(400, error)
  }
};

const deleteColumns = async (columns: BoardColumn[]): Promise<void> => {
  for await (const column of columns) {
    await column.remove();
  }
}

export {
  createColumn,
  updateFields,
  updateColumnsInBoard,
  deleteColumns,
};
