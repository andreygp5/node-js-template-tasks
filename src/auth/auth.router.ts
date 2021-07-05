import { Router } from 'express';
import * as controllers from './auth.controller';

const router: Router = Router();

router.post('/', controllers.login);

export default router;
