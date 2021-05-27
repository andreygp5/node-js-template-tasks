import { v1 as uuidv1 } from 'uuid';

/**
 * TaskModel
 *
 * @typedef {Object} TaskModel
 * @property {number} id Task unique id
 * @property {string} title Task title
 * @property {number} order Task order
 * @property {string} description Task description
 * @property {number} userId Task assigner id
 * @property {number} boardId Board id, where task is stored
 * @property {number} columnId Column id, where task is stored
 */

/**
 * Task model class
 */
export default class Task {
  /**
   * @param {TaskModel} [task={}] Task object
   */
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
