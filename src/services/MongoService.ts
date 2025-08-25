import bcrypt from 'bcrypt';
import User from '../models/mongoUser.js'; // chú ý thêm .js cho ESM
import type { IUser } from '../models/mongoUser.js';

const saltRounds = 10;

export const hashUserPassword = async (password: string): Promise<string> => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
};

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: string; // '1' or '0'
  roleId?: string;
}

export const createNewUser = async (data: CreateUserData): Promise<IUser> => {
  try {
    const hashPassword = await hashUserPassword(data.password);
    const newUser = new User({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === '1',
      roleId: data.roleId,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserInfoById = async (
  userId: string
): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

export interface UpdateUserData {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: string;
  roleId?: string;
}

export const updateUser = async (data: UpdateUserData): Promise<IUser[]> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      data.id,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1',
        roleId: data.roleId,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<string> => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return 'User deleted successfully';
  } catch (error) {
    throw error;
  }
};
