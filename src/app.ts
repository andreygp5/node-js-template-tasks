import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import "reflect-metadata";

import { SwaggerDefinition } from 'swagger-jsdoc';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import authRouter from './auth/auth.router';

import { logger, uncaughtLogger, unhandledLogger } from './middlewares/loggers';
import { errorMiddleware } from './middlewares/error';

import { IErrorHandler } from './helpers/ErrorHandler';

const app: express.Application = express();
const swaggerDocument: SwaggerDefinition = YAML.load(
  path.join(__dirname, '../doc/api.yaml')
);

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logger);

app.use('/login', authRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId', taskRouter);

app.use(
  (
    err: IErrorHandler,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => errorMiddleware(err, req, res)
);

process.on('uncaughtException', (error: Error) => uncaughtLogger(error));
process.on('unhandledRejection', (reason: string) => unhandledLogger(reason));

export default app;
