import { v1 as uuidv1 } from 'uuid';

import { IColumn } from './column';

/**
 * ColumnModel
 *
 * @typedef {Object} ColumnModel
 * @property {string} id Column unique id
 * @property {string} title Column title
 * @property {number} order Column order
 */

/**
 * Column model class
 */
export default class Column implements IColumn {
  id: string;

  title: string;

  order: number;

  /**
   * @param {ColumnModel} [column={}] Column object
   */
  constructor({ id = uuidv1(), title = 'TITLE', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
