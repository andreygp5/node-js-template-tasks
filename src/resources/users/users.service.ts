import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  findAll() {
    return this.usersRepository.getAllUsers();
  }

  findOne(id: string) {
    return this.usersRepository.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  findByLoginPassword(login: string, password: string) {
    return this.usersRepository.getUserByLoginPassword(login, password);
  }

  checkPasswordsMatch(userId: string, passwordToCompare: string) {
    return this.usersRepository.checkPasswordsMatch(userId, passwordToCompare);
  }
}
