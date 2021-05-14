const User = require('./user.model');

const users = [];

const getAll = async () => users;
const getById = async (id) => users.find((user) => user.id === id);
const createUser = async (user) => {
  const newUser = new User({ ...user });
  users.push(newUser);
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
  const userIndex = users.findIndex((user) => user.id === id);

  users.splice(userIndex, 1);
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
