import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import { UsersService } from '../resources/users/users.service';
import { IPayLoad } from './dto/jwt.payload';
import { ILoginResponse } from './dto/login.response';
import { UserInfo } from './dto/user.info';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private configService: ConfigService) {}

  async login(userInfo: UserInfo): Promise<ILoginResponse> {
    const { login, password } = userInfo;

    const user = await this.usersService.findByLoginPassword(login, password);
    const token = await this.getJWT({ userId: user.id, password });

    return { token };
  }

  getJWTSecretKey(): string {
    const JWT_SECRET_KEY = this.configService.get<string>('JWT_SECRET_KEY');

    if (!JWT_SECRET_KEY) {
      throw new Error('No JWT_SECRET_KEY in .env');
    }

    return JWT_SECRET_KEY;
  }

  async getJWT(payload: IPayLoad): Promise<string> {
    return new Promise((res, rej) => {
      try {
        const token = jwt.sign(payload, this.getJWTSecretKey());
        res(token);
      } catch (error) {
        rej(new Error(error));
      }
    });
  }

  async isTokenCorrect(token: string): Promise<boolean> {
    return new Promise(async (res) => {
      try {
        const decoded = <IPayLoad>jwt.verify(token, this.getJWTSecretKey());

        const { userId, password } = decoded;
        const isPasswordMatch = await this.usersService.checkPasswordsMatch(userId, password);

        res(isPasswordMatch);
      } catch (error) {
        res(false);
      }
    });
  }

  async validateRequest(req: Request): Promise<boolean> {
    const token = req.header('Authorization')?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    return this.isTokenCorrect(token);
  }
}
