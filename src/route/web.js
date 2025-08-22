const express = require('express');
const homeController = require('../controllers/homeController.js');

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

  return app.use('/', router);
};

module.exports = initWebRoutes;
