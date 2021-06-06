import express from 'express';

import { finished } from 'stream';
import fs from 'fs';
import path from 'path';

import { IErrorHandler } from '../helpers/ErrorHandler';

const logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const { method, url, body, query } = req;

  const start = Date.now();

  next();

  finished(res, () => {
    const { statusCode } = res;
    const time = Date.now() - start;

    const logStr = `[${method}] ${url} : ${statusCode} : Body=${JSON.stringify(body)} : Query=${JSON.stringify(query)} [${time}ms]\n`;

    fs.writeFile(
      path.resolve('logs/httpRequests.log'),
      logStr,
      { flag: 'a' },
      (err) => err
    );
  });
};

const errorLogger = (err: IErrorHandler, url: string, method: string): void => {
  const { statusCode, msg } = err;

  const logStr = `[${statusCode}] : ${JSON.stringify(msg)} from [${method}] - ${url} at ${new Date().toLocaleTimeString()}\n`;

  fs.writeFile(
    path.resolve('logs/errors.log'),
    logStr,
    { flag: 'a' },
    (error) => error
  );
};

export { logger, errorLogger };
