// app.ts
import 'dotenv/config'; // tương đương require('dotenv').config()
import express from 'express';
import type { Express } from 'express';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import connectDB from './config/db.js';

const app: Express = express();

// Parsers (Express 5 đã tích hợp body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình view engine
viewEngine(app);

// Khởi tạo routes
initWebRoutes(app);

// Kết nối database
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend Nodejs is running on port: ${port}`);
});
