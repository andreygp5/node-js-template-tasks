import {
  Controller, Post, Body,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserInfo } from './dto/user.info';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() userInfo: UserInfo) {
    return this.authService.login(userInfo);
  }
}
