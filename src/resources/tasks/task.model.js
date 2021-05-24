import { v1 as uuidv1 } from 'uuid';

export default class Task {
  constructor({
    id = uuidv1(),
    title = 'TITLE',
    order = 0,
    description = 'DESCRIPTION',
    userId,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
