import { Request, Response, NextFunction } from "express";

import * as authService from '../auth/auth.service';
import { ErrorHandler } from "../helpers/ErrorHandler";

const nonSecureRoutes = ['/', '/login'];

const validateToken = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extra check on /doc route needed, because swagger makes a lot of requests
    // with /doc (/doc/favicon ...)
    if (nonSecureRoutes.includes(req.path) || req.path.startsWith('/doc')) {
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
