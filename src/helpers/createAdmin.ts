import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from '../resources/users/dto/create-user.dto';
import { UsersService } from '../resources/users/users.service';

export const createAdmin = async (app: INestApplication): Promise<void> => {
  const userService = app.get(UsersService);

  try {
    await userService.findByLoginPassword('admin', 'admin');
  } catch (error) {
    const createUserDto: CreateUserDto = {
      name: 'ADMIN',
      login: 'admin',
      password: 'admin',
    };

    await userService.create(createUserDto);
  }
};
