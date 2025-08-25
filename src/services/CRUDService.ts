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
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: string | boolean;
  roleId?: string;
  positionId?: string;
}): Promise<void> => {
  try {
    const hashPassword = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address || null,
      phoneNumber: data.phoneNumber || null,
      gender:
        typeof data.gender === 'string'
          ? data.gender === '1'
          : data.gender || false,
      roleId: data.roleId || null,
      positionId: data.positionId || null,
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
export const getUserInfoById = async (
  userId: string | number
): Promise<any | null> => {
  try {
    const user = await db.User.findOne({
      where: { id: Number(userId) },
    });
    return user ? user.get({ plain: true }) : null;
  } catch (error) {
    throw error;
  }
};

// --- Update user ---
export const updateUser = async (data: {
  id: string | number;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: boolean;
  roleId?: string;
  positionId?: string;
}): Promise<any[]> => {
  try {
    console.log('📥 [updateUser] Input data:', data);

    const user = await db.User.findOne({ where: { id: Number(data.id) } });
    if (!user) {
      console.error('❌ [updateUser] User not found with id:', data.id);
      throw new Error('User not found');
    }

    console.log('✅ [updateUser] Found user before update:', user.toJSON());

    // Gán dữ liệu mới
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    console.log(
      '🔍 [updateUser] data.address =',
      data.address,
      ' | type:',
      typeof data.address
    );

    user.address = data.address || null;

    console.log('✍️ [updateUser] After set, user.address =', user.address);

    user.phoneNumber = data.phoneNumber || null;
    if (typeof data.gender === 'boolean') user.gender = data.gender;
    if (data.roleId) user.roleId = data.roleId;
    if (data.positionId) user.positionId = data.positionId;

    console.log('📝 [updateUser] User after assign:', user.toJSON());

    await user.save();

    console.log('✅ [updateUser] User updated successfully');

    const allUsers = await db.User.findAll({ raw: true });
    return allUsers;
  } catch (error) {
    console.error('❌ [updateUser] Error during update:', error);
    throw error;
  }
};

// --- Delete user ---
export const deleteUser = async (userId: string | number): Promise<string> => {
  try {
    const user = await db.User.findOne({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');

    await user.destroy();
    return 'User deleted successfully';
  } catch (error) {
    throw error;
  }
};
