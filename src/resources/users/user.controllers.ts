import express from 'express';
import { IUser } from './user';

import User from './user.model';
import * as usersService from './user.service';

const getUsers = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  const users = await usersService.getAll();
  // Map user fields to exclude secret fields like "password"
  res.status(200).json(users.map(User.toResponse));
};

const getUserById = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  try {
    const desiredUser = await usersService.getById(userId);
    if (!desiredUser) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }
    res.status(200).json(User.toResponse(desiredUser));
  } catch {
    res.status(404).send('User not found');
  }
};

const createUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const user: Omit<IUser, 'id'> = req.body;

  try {
    const createdUser = await usersService.createUser(user);
    res.status(201).json(User.toResponse(createdUser));
  } catch {
    res.status(400).send('Bad request');
  }
};

const updateUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }
  const user: IUser = req.body;

  try {
    const updatedUser = await usersService.updateUser(userId, user);
    res.status(200).json(User.toResponse(updatedUser));
  } catch {
    res.status(400).send('Bad request');
  }
};

const deleteUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({
      message: 'Id is not valid',
    });
    return;
  }

  try {
    await usersService.deleteUser(userId);
    res.status(204).send('The user has been deleted');
  } catch {
    res.status(404).send('User not found');
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
