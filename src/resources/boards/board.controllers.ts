import express from 'express';

import * as boardsService from './board.service';

import { ErrorHandler } from '../../helpers/ErrorHandler';
import { Board } from '../../entities/Board';

const getBoards = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
};

const getBoardById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  try {
    const desiredBoard = await boardsService.getById(boardId);
    if (!desiredBoard) {
      throw new ErrorHandler(404,'Board not found' )
    }
    res.status(200).json(desiredBoard);
  } catch (error) {
    next(error);
  }
};

const createBoard = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const board: Omit<Board, 'id'> = req.body;

  try {
    const createdBoard = await boardsService.createBoard(board);
    if (!createdBoard) {
      throw new ErrorHandler();
    }
    res.status(201).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const updateBoard = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }
  const board: Board = req.body;

  try {
    const updatedBoard = await boardsService.updateBoard(boardId, board);
    if (!updatedBoard) {
      throw new ErrorHandler();
    }
    res.status(200).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

const deleteBoard = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  try {
    await boardsService.deleteBoard(boardId);
    res.status(204).send('The board has been deleted');
  } catch (error) {
    next(error);
  }
};

export { getBoards, getBoardById, createBoard, updateBoard, deleteBoard };
