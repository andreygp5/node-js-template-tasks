import { v1 as uuidv1 } from 'uuid';

/**
 * ColumnModel
 *
 * @typedef {Object} ColumnModel
 * @property {number} id Column unique id
 * @property {string} title Column title
 * @property {number} order Column order
 */

/**
 * Column model class
 */
export default class Column {
  /**
   * @param {ColumnModel} [column={}] Column object
   */
  constructor({ id = uuidv1(), title = 'TITLE', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
