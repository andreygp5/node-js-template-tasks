import jwt from 'jsonwebtoken';
import config from '../common/config';

import { ErrorHandler } from '../helpers/ErrorHandler';
import * as usersService from '../resources/users/user.service';

const getJWT = async (payload: IPayLoad): Promise<string> => {
  return new Promise((res, rej) => {
    try {
      const token = jwt.sign(payload, config.JWT_SECRET_KEY);
      res(token);
    } catch (error) {
      rej(new ErrorHandler(500, 'Failed on generating'));
    }
  });
};

const isTokenCorrect = async (token: string): Promise<boolean> => {
  return new Promise(async (res, rej) => {
    try {
      const decoded = <IPayLoad>jwt.verify(token, config.JWT_SECRET_KEY);

      const { userId, password } = decoded;
      const isPasswordMatch = await usersService.checkPasswordsMatch(userId, password);

      res(isPasswordMatch);
    } catch (error) {
      rej(new ErrorHandler(401, 'Failed on parsing token'));
    }
  });
};

export { getJWT, isTokenCorrect };
