import { IColumn } from '../columns/column';

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export { IBoard };
