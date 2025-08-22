'use strict';

const Sequelize = require('sequelize');
const path = require('path');

// Reuse the existing sequelize instance configured in configdb
const { sequelize } = require('../config/configdb');

const db = {};

// Load models explicitly
db.User = require('./user')(sequelize, Sequelize.DataTypes);

// Expose sequelize and Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


