import { User } from '../../entities/User';

import { updateTasksWhereUserAssignee } from '../tasks/task.service';

// import { ErrorHandler } from '../../helpers/ErrorHandler';

/**
 * Get all users from db
 *
 * @returns {Promise<Array<import('./user.model.js').UserModel>>} Users array
 */
const getAll = async (): Promise<User[]> => User.find();

/**
 * Get user by id from db
 * If user with this id doesn't exist - returns undefined
 *
 * @param {number} id Desired user id
 *
 * @returns {Promise<import('./user.model.js').UserModel|undefined>} User or undefined
 */
const getById = async (id: string): Promise<User | undefined> => {
  const user = await User.findOne({ where: { id } });
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
  const newUser = await User.create({...user});
  newUser.save();
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
const updateUser = async (id: string, updatedUser: User): Promise<User | undefined> => {
  const user = await getById(id);
  await User.update(id, {...updatedUser});
  await user?.save()

  return user;
};

/**
 * Delete user with specified id from db
 *
 * @param {number} id Desired user id
 * @returns {Promise<void>}
 */
const deleteUser = async (id: string): Promise<void> => {
  await User.delete(id);

  updateTasksWhereUserAssignee(id);
};

export { getAll, getById, createUser, updateUser, deleteUser };
