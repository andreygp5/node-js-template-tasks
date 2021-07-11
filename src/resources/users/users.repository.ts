import { ForbiddenException, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { genPassword } from '../../helpers/genPassword';
import { Task } from '../tasks/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RespUserDto } from './dto/resp-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUsers(): Promise<RespUserDto[]> {
    const users = await this.find();
    return users.map(this.toResponse);
  }

  async getUserById(id: string): Promise<RespUserDto> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.toResponse(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<RespUserDto> {
    const { password } = createUserDto;
    const { salt, hashedPasssword } = await genPassword(password);

    const newUSer = await this.create({ ...createUserDto, salt, password: hashedPasssword });

    await this.save(newUSer);
    return this.toResponse(newUSer);
  }

  async checkPasswordsMatch(userId: string, passwordToCompare: string): Promise<boolean> {
    const user = await this.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException();
    }

    const { password } = user;

    const isSame = await bcrypt.compare(passwordToCompare, password);

    return isSame;
  }

  async getUserByLoginPassword(login: string, password: string): Promise<User> {
    const user = await User.findOne({ where: { login } });

    if (!user) {
      throw new NotFoundException();
    }

    const isCorrectPassword = await this.checkPasswordsMatch(user.id, password);

    if (!isCorrectPassword) {
      throw new ForbiddenException();
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<RespUserDto> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const { password } = user;
    const { password: newPassword } = updateUserDto;

    let isSame = false;

    if (newPassword) {
      isSame = await this.checkPasswordsMatch(id, newPassword);
    }

    if (!isSame) {
      const { salt, hashedPasssword } = await genPassword(password);
      await User.update(id, { ...updateUserDto, password: hashedPasssword, salt });
    } else {
      await User.update(id, updateUserDto);
    }

    return this.getUserById(id);
  }

  async nullUsersIdTasks(tasks: Task[]): Promise<void> {
    for await (const task of tasks) {
      task.userId = null;
      await task.save();
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const userTasks = await Task.find({ where: { userId: id } });
    await this.nullUsersIdTasks(userTasks);

    await user.remove();
  }

  toResponse(user: User): RespUserDto {
    const { id, name, login } = user;
    return { id, name, login } as RespUserDto;
  }
}
