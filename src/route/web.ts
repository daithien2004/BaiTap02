// route/web.ts
import { Router } from 'express';
import type { Express } from 'express';
import * as homeController from '../controllers/homeController.js';
import * as mongoController from '../controllers/mongoController.js';

const router: Router = Router();

const initWebRoutes = (app: Express): void => {
  // Route test cơ bản
  router.get('/', (req, res) => {
    res.send('Quảng Đại Thiện');
  });

  // Routes homeController
  router.get('/home', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getFindAllCrud);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  // Routes mongoController
  router.get('/mongo/home', mongoController.getHomePage);
  router.get('/mongo/about', mongoController.getAboutPage);
  router.get('/mongo/crud', mongoController.getCRUD);
  router.post('/mongo/post-crud', mongoController.postCRUD);
  router.get('/mongo/get-crud', mongoController.getFindAllCrud);
  router.get('/mongo/edit-crud', mongoController.getEditCRUD);
  router.post('/mongo/put-crud', mongoController.putCRUD);
  router.get('/mongo/delete-crud', mongoController.deleteCRUD);

  app.use('/', router);
};

export default initWebRoutes;
