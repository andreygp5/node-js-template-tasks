import Column from './column.model.js';

const createColumn = async (column) => new Column({ ...column });
const updateFields = async (newFields, column) => {
  const { title, order } = newFields;
  const newColumn = column;

  newColumn.title = title;
  newColumn.order = order;

  return newColumn;
};
const getColumnFromBoardById = async (columnId, board) =>
  board.columns.find((column) => column.id === columnId);
const updateColumnsInBoard = async (updatedColumns, board) => {
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
