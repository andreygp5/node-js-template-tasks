import * as boardsService from './board.service.js';

const getBoards = async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
};

const getBoardById = async (req, res) => {
  const { boardId } = req.params;

  try {
    const desiredBoard = await boardsService.getById(boardId);
    res.status(200).json(desiredBoard);
  } catch {
    res.status(404).send('Board not found');
  }
};

const createBoard = async (req, res) => {
  const board = req.body;

  try {
    const createdBoard = await boardsService.createBoard(board);
    res.status(201).json(createdBoard);
  } catch {
    res.status(400).send('Bad request');
  }
};

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const board = req.body;

  try {
    const updatedBoard = await boardsService.updateBoard(boardId, board);
    res.status(200).json(updatedBoard);
  } catch {
    res.status(400).send('Bad request');
  }
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    await boardsService.deleteBoard(boardId);
    res.status(204).send('The board has been deleted');
  } catch {
    res.status(404).send('Board not found');
  }
};

export { getBoards, getBoardById, createBoard, updateBoard, deleteBoard };
