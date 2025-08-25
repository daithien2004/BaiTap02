import type { Request, Response } from 'express';
import User from '../models/mongoUser.js';
import * as CRUDService from '../services/MongoService.js';

export const getHomePage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    console.log('-----------------------------');
    console.log(users);
    console.log('-----------------------------');

    res.render('mongo/homepage.ejs', { data: JSON.stringify(users) });
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getAboutPage = (req: Request, res: Response): void => {
  res.render('mongo/test/about.ejs');
};

export const getCRUD = (req: Request, res: Response): void => {
  res.render('mongo/crud.ejs');
};

export const getFindAllCrud = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await CRUDService.getAllUsers();
    res.render('mongo/users/findAllUser.ejs', { datalist: data });
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const postCRUD = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post CRUD from server');
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// --- Edit user page ---
export const getEditCRUD = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.id as string | undefined;
  if (userId) {
    try {
      const userData = await CRUDService.getUserInfoById(userId);
      res.render('mongo/users/updateUser.ejs', { data: userData });
    } catch (error: unknown) {
      console.error('Error fetching user:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.send('User not found');
  }
};

// --- Update user ---
export const putCRUD = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  try {
    const allUsers = await CRUDService.updateUser(data);
    res.render('mongo/users/findAllUser.ejs', { datalist: allUsers });
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteCRUD = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.query.id as string | undefined;
  if (userId) {
    try {
      await CRUDService.deleteUser(userId);
      return res.send('Delete user successfully');
    } catch (error: unknown) {
      console.error('Error deleting user:', error);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    return res.send('User not found');
  }
};
