const express = require('express');
const homeController = require('../controllers/homeController.js');
const mongoController = require('../controllers/mongoController.js');

const router = express.Router();

const initWebRoutes = (app) => {
  router.get('/', (req, res) => {
    return res.send('Quảng Đại Thiện');
  });

  router.get('/home', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getFindAllCrud);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  router.get('/mongo/home', mongoController.getHomePage);
  router.get('/mongo/about', mongoController.getAboutPage);
  router.get('/mongo/crud', mongoController.getCRUD);
  router.post('/mongo/post-crud', mongoController.postCRUD);
  router.get('/mongo/get-crud', mongoController.getFindAllCrud);
  router.get('/mongo/edit-crud', mongoController.getEditCRUD);
  router.post('/mongo/put-crud', mongoController.putCRUD);
  router.get('/mongo/delete-crud', mongoController.deleteCRUD);

  return app.use('/', router);
};

module.exports = initWebRoutes;
