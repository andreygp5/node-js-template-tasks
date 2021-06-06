import { v1 as uuidv1 } from 'uuid';
import { IColumn } from '../columns/column';
import { IBoard } from './board';

/**
 * BoardModel
 *
 * @typedef {Object} BoardModel
 * @property {string} id Board unique id
 * @property {string} title Board title
 * @property {Array<import("../columns/column.model.js").ColumnModel>} columns Board columns
 */

/**
 * Board model class
 */
export default class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumn[];

  /**
   * @param {BoardModel} [board={}] Board object
   */
  constructor({ id = uuidv1(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
