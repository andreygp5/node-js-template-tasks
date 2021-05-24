import { Router } from 'express';
import * as controllers from './board.controllers.js';

const router = new Router();

router.get('/', controllers.getBoards);
router.get('/:boardId', controllers.getBoardById);
router.post('/', controllers.createBoard);
router.put('/:boardId', controllers.updateBoard);
router.delete('/:boardId', controllers.deleteBoard);

export default router;
