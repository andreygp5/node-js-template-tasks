import jwt from 'jsonwebtoken'
import config from '../common/config';
import { ErrorHandler } from '../helpers/ErrorHandler';

interface IPayLoad {
  userId: string;
  password: string;
}

const getJWT = async (payload: IPayLoad): Promise<string> => {
  return new Promise((res, rej) => {
    try {
      const token = jwt.sign(payload, config.JWT_SECRET_KEY)
      res(token);
    } catch (error) {
      rej(new ErrorHandler(500, 'Failed on generating '));
    }
  })
}

export { getJWT };
