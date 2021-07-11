import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logToFile } from '../helpers/logToFile';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const logObject: Partial<{status: number, timestamp: string, path: string}> = {};

    logObject.timestamp = new Date().toISOString();
    logObject.path = request.url;

    if (exception instanceof HttpException) {
      logObject.status = exception.getStatus();
    } else {
      logObject.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const logObjectStringified = JSON.stringify(logObject);

    process.stdout.write(logObjectStringified);
    logToFile('errors', logObjectStringified);

    response
      .status(logObject.status)
      .json(logObject);
  }
}
