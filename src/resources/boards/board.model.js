import { v1 as uuidv1 } from 'uuid';

export default class Board {
  constructor({ id = uuidv1(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
