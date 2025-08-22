require('dotenv').config();
const express = require('express');
const viewEngine = require('./config/viewEngine');
const initWebRoutes = require('./route/web');
const connectDB = require('./config/configdb');

const app = express();

// Parsers (không cần body-parser với Express 5)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log('Backend Nodejs is runing on the port :' + port);
});
