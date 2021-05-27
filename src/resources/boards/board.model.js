import { v1 as uuidv1 } from 'uuid';

/**
 * BoardModel
 *
 * @typedef {Object} BoardModel
 * @property {number} id Board unique id
 * @property {string} title Board title
 * @property {Array<import("../columns/column.model.js").ColumnModel>} columns Board columns
 */

/**
 * Board model class
 */
export default class Board {
  /**
   * @param {BoardModel} [board={}] Board object
   */
  constructor({ id = uuidv1(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
