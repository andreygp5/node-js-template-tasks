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
    const user = await this.findOneOrFail({ where: { id } });
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
    const user = await this.findOneOrFail({ where: { id: userId } });
    const { password } = user;

    const isSame = await bcrypt.compare(passwordToCompare, password);

    return isSame;
  }

  async getUserByLoginPassword(login: string, password: string): Promise<User | undefined> {
    const user = await User.findOneOrFail({ where: { login } });

    const isCorrectPassword = await this.checkPasswordsMatch(user.id, password);
    if (!isCorrectPassword) {
      return undefined;
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<RespUserDto> {
    const user = await this.findOneOrFail({ where: { id } });

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
    const user = await this.findOneOrFail({ where: { id } });

    const userTasks = await Task.find({ where: { userId: id } });
    await this.nullUsersIdTasks(userTasks);

    await user.remove();
  }

  toResponse(user: User): RespUserDto {
    const { id, name, login } = user;
    return { id, name, login } as RespUserDto;
  }
}
