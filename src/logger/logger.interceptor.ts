import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logToFile } from '../helpers/logToFile';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logToConsole(logStr: string) {
    process.stdout.write(logStr);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const {
      method, url, body, query,
    } = req;

    return next
      .handle()
      .pipe(
        tap(() => {
          const { statusCode } = res;
          const time = Date.now() - now;

          const logStr = `[${method}] ${url} : ${statusCode} : Body=${JSON.stringify(body)} : Query=${JSON.stringify(query)} [${time}ms]\n`;
          logToFile('httpRequests', logStr);
          this.logToConsole(logStr);
        }),
      );
  }
}
