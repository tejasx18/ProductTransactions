import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import seedRoutes from './routes/seedRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Connection to the database
try {
    await sequelize.authenticate();
    console.log('Database Connection has been established successfully.');
    sequelize.sync({ alter: true })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  

// Routes
app.use('/api', seedRoutes);
app.use('/api', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
