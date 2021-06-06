import { v1 as uuidv1 } from 'uuid';

import { ITask } from './task';

/**
 * TaskModel
 *
 * @typedef {Object} TaskModel
 * @property {string} id Task unique id
 * @property {string} title Task title
 * @property {number} order Task order
 * @property {string} description Task description
 * @property {string} userId Task assigner id
 * @property {string} boardId Board id, where task is stored
 * @property {string} columnId Column id, where task is stored
 */

/**
 * Task model class
 */
export default class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  /**
   * @param {TaskModel} [task={}] Task object
   */
  constructor({
    id = uuidv1(),
    title = 'TITLE',
    order = 0,
    description = 'DESCRIPTION',
    userId = '',
    boardId = '',
    columnId = '',
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
