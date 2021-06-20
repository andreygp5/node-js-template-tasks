import express from 'express';

import { ErrorHandler, IErrorHandler } from '../helpers/ErrorHandler';
import { errorLogger } from './loggers';

const errorMiddleware = (
  err: IErrorHandler | Error,
  req: express.Request,
  res: express.Response
): void => {
  let statusCode: number;
  let msg: string;

  if (err instanceof ErrorHandler) {
    msg = err.msg;
    statusCode = err.statusCode;
  } else {
    msg = JSON.stringify(err);
    statusCode = 500;
  }

  const { method, url } = req;

  errorLogger(err, url, method);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: msg,
  });
};

export { errorMiddleware };
