import express from 'express';
import { IUser } from './user';

import User from './user.model';
import * as usersService from './user.service';

import { ErrorHandler } from '../../helpers/ErrorHandler';

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
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  try {
    const desiredUser = await usersService.getById(userId);
    if (!desiredUser) {
      throw new ErrorHandler(400, 'Id is not valid');
    }
    res.status(200).json(User.toResponse(desiredUser));
  } catch (error) {
    next(error);
  }
};

const createUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const user: Omit<IUser, 'id'> = req.body;

  try {
    const createdUser = await usersService.createUser(user);
    if (!createdUser) {
      throw new ErrorHandler();
    }
    res.status(201).json(User.toResponse(createdUser));
  } catch (error){
    next(error);
  }
};

const updateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }
  const user: IUser = req.body;

  try {
    const updatedUser = await usersService.updateUser(userId, user);
    if (!updatedUser) {
      throw new ErrorHandler();
    }
    res.status(200).json(User.toResponse(updatedUser));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { userId } = req.params;
  if (!userId) {
    throw new ErrorHandler(400, 'Id is not valid');
  }

  try {
    await usersService.deleteUser(userId);
    res.status(204).send('The user has been deleted');
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
