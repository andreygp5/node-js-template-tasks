import * as usersRepo from './user.memory.repository.js';

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const createUser = (user) => usersRepo.createUser(user);
const updateUser = (id, updatedUser) => usersRepo.updateUser(id, updatedUser);
const deleteUser = (id) => usersRepo.deleteUser(id);

export { getAll, getById, createUser, updateUser, deleteUser };
