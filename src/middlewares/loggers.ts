import express from 'express';

import { finished } from 'stream';
import fs from 'fs';
import path from 'path';

import { IErrorHandler } from '../helpers/ErrorHandler';

const logToFile = (fileName: string, logStr: string, isSync = false) : void => {
  const filePath = path.resolve(`logs/${fileName}.log`);
  if (isSync) {
    fs.writeFileSync(
      filePath,
      logStr,
      { flag: 'a' }
    );
  } else {
    fs.writeFile(
      filePath,
      logStr,
      { flag: 'a' },
      (err) => err
    );
  }
}

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
    process.stdout.write(logStr);

    logToFile('httpRequests', logStr);
  });
};

const errorLogger = (err: IErrorHandler, url: string, method: string): void => {
  const { statusCode, msg } = err;

  const logStr = `[${statusCode}] : ${JSON.stringify(msg)} from [${method}] - ${url} at ${new Date().toLocaleTimeString()}\n`;
  process.stdout.write(logStr);

  logToFile('errors', logStr);
};

const uncaughtLogger = (err: Error): void => {
  const logStr = `${err.message} at ${new Date().toLocaleTimeString()}\n`;

  process.stdout.write(logStr);
  logToFile('uncaughtErrors', logStr, true);

  process.exit(1);
};


const unhandledLogger = (reason: string): void => {
  const logStr = `Reason: ${reason}\n`;

  process.stdout.write(logStr);
  logToFile('unhandledErrors', logStr, true);
  
  process.exit(1);
};

export { logger, errorLogger, uncaughtLogger, unhandledLogger };
