import { v1 as uuidv1 } from 'uuid';

/**
 * UserModel
 *
 * @typedef {Object} UserModel
 * @property {number} id User unique id
 * @property {string} name User name
 * @property {string} login User login
 * @property {string} password User password
 */

/**
 * User model class
 */
export default class User {
  /**
   * @param {UserModel} [user={}] User object
   */
  constructor({
    id = uuidv1(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns User object without secret fields
   *
   * @param {UserModel} user User object
   * @typedef {{id: number, name: string, login: string}} UserToResponse User object without secret fields
   *
   * @return {UserToResponse} User object without secret fields
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
