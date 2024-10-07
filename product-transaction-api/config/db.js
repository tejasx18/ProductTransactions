import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,    
  process.env.DB_USER,    
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,    
    dialect: 'postgres',          
    port: process.env.DB_PORT,    
    logging: false, 
  }
);

// const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/ProductTransaction',{
//   logging: false, 
// });

export default sequelize;