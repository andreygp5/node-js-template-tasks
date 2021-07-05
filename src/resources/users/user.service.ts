import * as usersRepo from './user.memory.repository';
import { User } from '../../entities/User';

/**
 * Get all users from db
 *
 * @returns {Promise<Array<import('./user.model.js').UserModel>>} Users array
 */
const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Get user by id from db
 * If user with this id doesn't exist - throw new ErrorHandler(404, 'User not found');
 *
 * @param {number} id Desired user id
 *
 * @returns {Promise<import('./user.model.js').UserModel>} User
 */
const getById = (id: string): Promise<User> => usersRepo.getById(id);

/**
 * Creates user in db with info from request
 *
 * @param {{name: string, login: string, password: string}} User User data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Created user instance
 */
const createUser = (user: Omit<User, 'id'>): Promise<User> => usersRepo.createUser(user);

const checkPasswordsMatch = async (userId: string, passwordToCompare: string): Promise<boolean> => {
  return usersRepo.checkPasswordsMatch(userId, passwordToCompare);
};

const getUserByLoginPassword = async (login: string, password: string): Promise<User | undefined> => {
  return usersRepo.getUserByLoginPassword(login, password);
};

/**
 * Updates user in db with info from request
 *
 * @param {number} id
 * @param {{name: string, login: string, password: string}} updatedUser Updated user data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Updated user instance
 */
const updateUser = (id: string, updatedUser: User): Promise<User | undefined> =>
  usersRepo.updateUser(id, updatedUser);

/**
 * Delete user with specified id from db
 *
 * @param {number} id Desired user id
 *
 * @returns {Promise<void>}
 */
const deleteUser = (id: string): Promise<void> => usersRepo.deleteUser(id);

export {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
  checkPasswordsMatch,
  getUserByLoginPassword
};
