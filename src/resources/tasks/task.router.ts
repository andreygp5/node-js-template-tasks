import { Router } from 'express';
import * as controllers from './task.controllers';

const router: Router = Router({ mergeParams: true });

router.get('/tasks', controllers.getTasks);
router.get('/tasks/:taskId', controllers.getTaskById);
router.post('/tasks', controllers.createTask);
router.put('/tasks/:taskId', controllers.updateTask);
router.delete('/tasks/:taskId', controllers.deleteTask);

export default router;
