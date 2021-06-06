import express from 'express';

import { finished } from 'stream';
import fs from 'fs';
import path from 'path';

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

    const logStr = `[${method}] ${url} : ${statusCode} : Body=${JSON.stringify(
      body
    )} : Query=${JSON.stringify(query)} [${time}ms]\n`;

    fs.writeFile(
      path.resolve('logs/httpRequests.log'),
      logStr,
      { flag: 'a' },
      (err) => err
    );
  });
};

export { logger };
