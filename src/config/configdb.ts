// config/configdb.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'node_fulltask',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'thien',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error: unknown) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
