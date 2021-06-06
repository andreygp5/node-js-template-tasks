import express from 'express';
import { IBoard } from './board';

import * as boardsService from './board.service';

const getBoards = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
};

const getBoardById = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  try {
    const desiredBoard = await boardsService.getById(boardId);
    if (desiredBoard) {
      res.status(200).json(desiredBoard);
    } else {
      res.status(404).json('Board not found');
    }
  } catch {
    res.status(404).send('Board not found');
  }
};

const createBoard = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const board: Omit<IBoard, 'id'> = req.body;

  try {
    const createdBoard = await boardsService.createBoard(board);
    res.status(201).json(createdBoard);
  } catch {
    res.status(400).send('Bad request');
  }
};

const updateBoard = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }
  const board: IBoard = req.body;

  try {
    const updatedBoard = await boardsService.updateBoard(boardId, board);
    res.status(200).json(updatedBoard);
  } catch {
    res.status(400).send('Bad request');
  }
};

const deleteBoard = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  try {
    await boardsService.deleteBoard(boardId);
    res.status(204).send('The board has been deleted');
  } catch {
    res.status(404).send('Board not found');
  }
};

export { getBoards, getBoardById, createBoard, updateBoard, deleteBoard };
