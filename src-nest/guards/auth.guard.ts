import {
  Injectable, CanActivate, ExecutionContext,
} from '@nestjs/common';

import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

const nonSecureRoutes = ['/', '/login'];

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (nonSecureRoutes.includes(request.path) || request.path.startsWith('/doc')) {
      return true;
    }

    return this.authService.validateRequest(request);
  }
}
