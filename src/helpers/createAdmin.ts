import { User } from '../entities/User';
import * as usersService from '../resources/users/user.service';

const createAdmin = async (): Promise<void> => {
  await usersService.createUser({ login: 'admin', password: 'admin' } as User);
}

export { createAdmin };
