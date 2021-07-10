import { NotFoundException } from '@nestjs/common';
import { BaseEntity, EntityRepository, Repository } from 'typeorm';

import { CreateColumnDto } from '../columns/dto/create-column.dto';
import { UpdateColumnDto } from '../columns/dto/update-column.dto';
import { BoardColumn } from '../columns/entities/column.entity';
import { Task } from '../tasks/entities/task.entity';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards(): Promise<Board[]> {
    const boards = await this.find();
    return boards;
  }

  async getBoardById(id: string): Promise<Board> {
    const board = await this.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException();
    }

    return board;
  }

  private async createColumn(column: CreateColumnDto): Promise<BoardColumn> {
    const createdColumn = await BoardColumn.create(column);
    await createdColumn.save();
    return createdColumn;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { columns, title }: { columns: CreateColumnDto[], title: string } = createBoardDto;

    const newBoard = this.create();

    const createdColumns: BoardColumn[] = [];
    for await (const column of columns) {
      createdColumns.push(await this.createColumn(column));
    }

    newBoard.title = title;
    newBoard.columns = createdColumns;

    await newBoard.save();
    return newBoard;
  }

  private async updateColumn(
    column: BoardColumn, updateColumnDto: UpdateColumnDto,
  ): Promise<BoardColumn> {
    await BoardColumn.update(column, updateColumnDto);
    await column.reload();
    return column;
  }

  private async getUpdatedColumnsOnBoard(columns: BoardColumn[]): Promise<BoardColumn[]> {
    const updatedColumns: BoardColumn[] = [];

    for await (const column of columns) {
      const oldColumn = await BoardColumn.findOne(column.id);

      if (!oldColumn) {
        updatedColumns.push(await this.createColumn(column));
      } else {
        updatedColumns.push(await this.updateColumn(oldColumn, column));
      }
    }
    return updatedColumns;
  }

  async updateBoard(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.getBoardById(id);

    const { title, columns } = updateBoardDto;

    if (columns) {
      board.columns = await this.getUpdatedColumnsOnBoard(columns);
    }

    if (title) {
      board.title = title;
    }

    await board.save();
    return board;
  }

  private async deleteRelated<T extends BaseEntity>(entitiesList: Array<T>): Promise<void> {
    for await (const item of entitiesList) {
      await item.remove();
    }
  }

  async deleteBoard(id: string): Promise<void> {
    const board = await this.getBoardById(id);

    await this.deleteRelated(board.columns);

    const boardTasks = await Task.find({ where: { boardId: id } });
    await this.deleteRelated(boardTasks);

    await board.remove();
  }
}
