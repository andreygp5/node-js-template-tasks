import User from './user.model.js';
import { USERS } from '../../db/database.js';

import { updateTasksWhereUserAssignee } from '../tasks/task.service.js';

/**
 * Get all users from db
 *
 * @returns {Promise<Array<import('./user.model.js').UserModel>>} Users array
 */
const getAll = async () => USERS;

/**
 * Get user by id from db
 * If user with this id doesn't exist - returns undefined
 *
 * @param {number} id Desired user id
 *
 * @returns {Promise<import('./user.model.js').UserModel|undefined>} User or undefined
 */
const getById = async (id) => USERS.find((user) => user.id === id);

/**
 * Creates user in db with info from request
 *
 * @param {{name: string, login: string, password: string}} User User data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Created user instance
 */
const createUser = async (user) => {
  const newUser = new User({ ...user });
  USERS.push(newUser);
  return newUser;
};

/**
 * Updates user in db with info from request
 *
 * @param {number} id
 * @param {{name: string, login: string, password: string}} updatedUser Updated user data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Updated user instance
 */
const updateUser = async (id, updatedUser) => {
  const user = await getById(id);
  const { name, login, password } = updatedUser;

  user.name = name;
  user.login = login;
  user.password = password;

  return user;
};

/**
 * Delete user with specified id from db
 *
 * @param {number} id Desired user id
 * @returns {Promise<void>}
 */
const deleteUser = async (id) => {
  const userIndex = USERS.findIndex((user) => user.id === id);

  USERS.splice(userIndex, 1);
  updateTasksWhereUserAssignee(id);
};

export { getAll, getById, createUser, updateUser, deleteUser };
