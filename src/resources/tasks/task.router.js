import { Router } from 'express';
import * as controllers from './task.controllers.js';

const router = new Router();

router.get('/:boardId/tasks', controllers.getTasks);

router.get('/:boardId/tasks/:taskId', controllers.getTaskById);

router.post('/:boardId/tasks', controllers.createTask);

router.put('/:boardId/tasks/:taskId', controllers.updateTask);

router.delete('/:boardId/tasks/:taskId', controllers.deleteTask);

export default router;
