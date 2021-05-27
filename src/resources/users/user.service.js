import * as usersRepo from './user.memory.repository.js';

/**
 * Get all users from db
 *
 * @returns {Promise<Array<import('./user.model.js').UserModel>>} Users array
 */
const getAll = () => usersRepo.getAll();

/**
 * Get user by id from db
 * If user with this id doesn't exist - returns undefined
 *
 * @param {number} id Desired user id
 *
 * @returns {Promise<import('./user.model.js').UserModel|undefined>} User or undefined
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Creates user in db with info from request
 *
 * @param {{name: string, login: string, password: string}} User User data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Created user instance
 */
const createUser = (user) => usersRepo.createUser(user);

/**
 * Updates user in db with info from request
 *
 * @param {number} id
 * @param {{name: string, login: string, password: string}} updatedUser Updated user data from request
 *
 * @returns {Promise<import('./user.model.js').UserModel>} Updated user instance
 */
const updateUser = (id, updatedUser) => usersRepo.updateUser(id, updatedUser);

/**
 * Delete user with specified id from db
 *
 * @param {number} id Desired user id
 *
 * @returns {Promise<void>}
 */
const deleteUser = (id) => usersRepo.deleteUser(id);

export { getAll, getById, createUser, updateUser, deleteUser };
