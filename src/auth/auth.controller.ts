import express from 'express';

import * as usersService from '../resources/users/user.service';
import * as authService from './auth.service';

import { ErrorHandler } from '../helpers/ErrorHandler';

interface ILoginBody {
  login: string | undefined;
  password: string | undefined;
}

const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  const { login: loginString, password: passwordString }: ILoginBody = req.body;

  if (!loginString || !passwordString) {
    return next(new ErrorHandler(400, 'Body should contain login and password'));
  }

  const user = await usersService.getUserByLoginPassword(loginString, passwordString);

  if (user === undefined) {
    return next(new ErrorHandler(403, 'Incorrect password or login'));
  }

  try {
    const token = await authService.getJWT({ userId: user.id, password: passwordString });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export { login };
