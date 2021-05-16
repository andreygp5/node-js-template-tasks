import { Router } from 'express';
import * as controllers from './user.controllers.js';

const router = new Router();

router.get('/', controllers.getUsers);
router.get('/:userId', controllers.getUserById);
router.post('/', controllers.createUser);
router.put('/:userId', controllers.updateUser);
router.delete('/:userId', controllers.deleteUser);

export default router;
