const User = require('../models/mongoUser');
const CRUDService = require('../services/MongoService');

const getHomePage = async (req, res) => {
  try {
    let users = await User.find(); // Mongoose tương đương findAll()
    console.log('-----------------------------');
    console.log(users);
    console.log('-----------------------------');

    return res.render('mongo/homepage.ejs', { data: JSON.stringify(users) });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).send('Internal Server Error');
  }
};

const getAboutPage = (req, res) => {
  return res.render('mongo/test/about.ejs');
};

const getCRUD = (req, res) => {
  return res.render('mongo/crud.ejs');
};

const getFindAllCrud = async (req, res) => {
  try {
    let data = await CRUDService.getAllUsers(); // service sẽ dùng Mongoose
    return res.render('mongo/users/findAllUser.ejs', { datalist: data });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).send('Internal Server Error');
  }
};

const postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send('Post CRUD from server');
};

const getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render('mongo/users/updateUser.ejs', { data: userData });
  } else {
    return res.send('User not found');
  }
};

const putCRUD = async (req, res) => {
  let data = req.body;
  try {
    let allUsers = await CRUDService.updateUser(data);
    return res.render('mongo/users/findAllUser.ejs', { datalist: allUsers });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).send('Internal Server Error');
  }
};

const deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    try {
      await CRUDService.deleteUser(userId);
      return res.send('Delete user successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    return res.send('User not found');
  }
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  getFindAllCrud,
  postCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
