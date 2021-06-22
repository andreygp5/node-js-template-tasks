import { Request, Response, NextFunction } from "express";

import * as authService from '../auth/auth.service';
import { ErrorHandler } from "../helpers/ErrorHandler";

const nonSecureRoutes = ['/', '/login', '/doc/'];

const validateToken = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    if (nonSecureRoutes.includes(req.path) || req.path.includes('doc')) {
      return next();
    }

    const token = req.header('Authorization')?.split('Bearer ')[1];
    if (!token) {
      throw new ErrorHandler(401, 'No token');
    }

    const isValidToken = await authService.isTokenCorrect(token);
    if (!isValidToken) {
      throw new ErrorHandler(401, 'Invalid token');
    }

    next();
  } catch (error) {
    next(error);
  }
}

export { validateToken };
