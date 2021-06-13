import express from 'express';

import { IErrorHandler } from '../helpers/ErrorHandler';
import { errorLogger } from './loggers';

const errorMiddleware = (
  err: IErrorHandler,
  req: express.Request,
  res: express.Response
): void => {
  const { statusCode, msg } = err;
  const { method, url } = req;

  errorLogger(err, url, method);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: msg,
  });
};

export { errorMiddleware };
