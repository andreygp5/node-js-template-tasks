import bcrypt from 'bcrypt';

import { Task } from '../../entities/Task';
import { User } from '../../entities/User';
import { ErrorHandler } from '../../helpers/ErrorHandler';
import { genPassword } from '../../helpers/genPassword';

/**
 * Get all users from db
 *
 * @returns {Promise<Array<import('./user.model.js').UserModel>>} Users array
 */
const getAll = async (): Promise<User[]> => User.find();

/**
 * Get user by id from db
 * If user with this id doesn't exist - throws new ErrorHandler(404, 'User not found');
 *
 * @param {number} id Desired user id
 *
 * @returns {Promise<import('./user.model.js').UserModel>} User
 */
const getById = async (id: string): Promise<User> => {
  const user = await User.findOne({ where: { id } });

  if (!user) {
    throw new ErrorHandler(404, 'User not found');
  }

  return user;
}

/**
 * Creates user in db with info from request
 *
 * @param {{name: string, login: string, password: string}} User User data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Created user instance
 */
const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const { password } = user;
  const { salt, hashedPasssword } = await genPassword(password);

  const newUser = await User.create({ ...user, salt, password: hashedPasssword });
  await newUser.save();

  const savedUser = await getById(newUser.id);

  return savedUser;
};

const checkPasswordsMatch = async (userId: string, passwordToCompare: string): Promise<boolean> => {
  const user = await getById(userId);
  const { password } = user;

  const isSame = await bcrypt.compare(passwordToCompare, password);

  return isSame;
};

const getUserByLoginPassword = async (login: string, password: string): Promise<User | undefined> => {
  const user = await User.findOne({ where: { login } });
  if (!user) {
    return undefined;
  }

  const isCorrectPassword = await checkPasswordsMatch(user.id, password);
  if (!isCorrectPassword) {
    return undefined;
  }

  return user;
};

/**
 * Updates user in db with info from request
 *
 * @param {number} id
 * @param {{name: string, login: string, password: string}} updatedUser Updated user data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Updated user instance
 */
const updateUser = async (id: string, updatedUser: User): Promise<User | undefined> => {
  const user = await getById(id);

  const { password } = user;
  const { password: newPassword } = updatedUser;

  const isSame = await checkPasswordsMatch(id, newPassword);

  if (!isSame) {
    const { salt, hashedPasssword } = await genPassword(password);
    await User.update(id, { ...updatedUser, password: hashedPasssword, salt });
  } else {
    await User.update(id, updatedUser);
  }

  return getById(id);
};

/**
 * Delete user with specified id from db
 *
 * @param {number} id Desired user id
 * @returns {Promise<void>}
 */
const deleteUser = async (id: string): Promise<void> => {
  const user = await getById(id);

  const allTasks = await Task.find({ where: { userId: id } });

  for await (const task of allTasks) {
    task.userId = null;
    await task.save();
  }

  await user.remove();
};

export {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
  checkPasswordsMatch,
  getUserByLoginPassword
};
