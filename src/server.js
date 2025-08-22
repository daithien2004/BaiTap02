require('dotenv').config();
const express = require('express');
const viewEngine = require('./config/viewEngine');
const initWebRoutes = require('./route/web');
// const connectDB = require('./config/configdb');
const connectDB = require('./config/db');

const app = express();

// Parsers (không cần body-parser với Express 5)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Backend Nodejs is runing on the port :' + port);
});
