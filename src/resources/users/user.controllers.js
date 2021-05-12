const User = require('./user.model');
const usersService = require('./user.service');

const getUsers = async (req, res) => {
  const users = await usersService.getAll();
  // Map user fields to exclude secret fields like "password"
  res.status(200).json(users.map(User.toResponse));
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const desiredUser = await usersService.getById(userId);
    res.status(200).json(User.toResponse(desiredUser));
  } catch {
    res.status(404).send('User not found');
  }
};

const createUser = async (req, res) => {
  const user = req.body;

  try {
    await usersService.createUser(user);
    res.status(201).send('The user has been created');
  } catch {
    res.status(400).send('Bad request');
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updatedUser = req.body;

  try {
    await usersService.updateUser(userId, updatedUser);
    res.status(201).send('The user has been created');
  } catch {
    res.status(400).send('Bad request');
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await usersService.deleteUser(userId);
    res.status(204).send('The user has been deleted');
  } catch {
    res.status(404).send('User not found');
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
