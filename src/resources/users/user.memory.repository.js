import User from './user.model.js';
import { USERS } from '../../db/database.js';

import { updateTasksWhereUserAssignee } from '../tasks/task.service.js';

const getAll = async () => USERS;
const getById = async (id) => USERS.find((user) => user.id === id);
const createUser = async (user) => {
  const newUser = new User({ ...user });
  USERS.push(newUser);
  return newUser;
};
const updateUser = async (id, updatedUser) => {
  const user = await getById(id);
  const { name, login, password } = updatedUser;

  user.name = name;
  user.login = login;
  user.password = password;

  return user;
};
const deleteUser = async (id) => {
  const userIndex = USERS.findIndex((user) => user.id === id);

  USERS.splice(userIndex, 1);
  updateTasksWhereUserAssignee(id);
};

export { getAll, getById, createUser, updateUser, deleteUser };
