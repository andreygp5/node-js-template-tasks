import {
  Injectable, CanActivate, ExecutionContext,
} from '@nestjs/common';

import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.authService.validateRequest(request);
  }
}
