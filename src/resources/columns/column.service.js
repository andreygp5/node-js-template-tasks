import * as columnsRepo from './column.memory.repository.js';

const createColumn = (column) => columnsRepo.createColumn(column);
const updateFields = (newFields, column) =>
  columnsRepo.updateFields(newFields, column);
const getColumnFromBoardById = (columnId, board) =>
  columnsRepo.getColumnFromBoardById(columnId, board);
const updateColumnsInBoard = (updatedColumns, board) =>
  columnsRepo.updateColumnsInBoard(updatedColumns, board);

export {
  createColumn,
  updateFields,
  getColumnFromBoardById,
  updateColumnsInBoard,
};
