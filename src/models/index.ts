import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/configdb.js';
import { UserModelInit } from './user.js';
import mongoose from 'mongoose';
import User from './mongoUser.js';

const db: any = {};

db.User = User;
// db.User = UserModelInit(sequelize, DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
