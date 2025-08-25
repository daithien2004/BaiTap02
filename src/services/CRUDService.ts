// services/CRUDService.ts
import bcrypt from 'bcrypt';
import db from '../models/index.js';

const saltRounds = 10;

// --- Hash password ---
const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

// --- Create new user ---
export const createNewUser = async (data: {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address?: string,
  phoneNumber?: string,
  gender?: string,
  roleId?: string,
}): Promise<void> => {
  try {
    const hashPassword = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === '1',
      roleId: data.roleId,
    });
  } catch (error) {
    throw error;
  }
};

// --- Get all users ---
export const getAllUsers = async (): Promise<any[]> => {
  try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (error) {
    throw error;
  }
};

// --- Get user by ID ---
export const getUserInfoById = async (userId: string): Promise<any | null> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// --- Update user ---
export const updateUser = async (data: {
  id: string,
  firstName: string,
  lastName: string,
  address?: string,
}): Promise<any[]> => {
  try {
    const user = await db.User.findOne({ where: { id: data.id } });
    if (!user) throw new Error('User not found');

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.address = data.address;
    await user.save();

    const allUsers = await db.User.findAll({ raw: true });
    return allUsers;
  } catch (error) {
    throw error;
  }
};

// --- Delete user ---
export const deleteUser = async (userId: string): Promise<string> => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    await user.destroy();
    return 'User deleted successfully';
  } catch (error) {
    throw error;
  }
};
