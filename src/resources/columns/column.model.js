import { v1 as uuidv1 } from 'uuid';

export default class Column {
  constructor({ id = uuidv1(), title = 'TITLE', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
