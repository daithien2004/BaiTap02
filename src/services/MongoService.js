const bcrypt = require('bcrypt');
const User = require('../models/mongoUser'); // import Mongoose model User

const saltRounds = 10;

// Hash password
const hashUserPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
};

// Create new user
const createNewUser = async (data) => {
  try {
    const hashPassword = await hashUserPassword(data.password);
    const newUser = new User({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === '1', // true/false
      roleId: data.roleId,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

// Get user by ID
const getUserInfoById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

// Update user
const updateUser = async (data) => {
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
      { new: true } // trả về document sau khi cập nhật
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

// Delete user
const deleteUser = async (userId) => {
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

module.exports = {
  createNewUser,
  getAllUsers,
  getUserInfoById,
  updateUser,
  deleteUser,
};
