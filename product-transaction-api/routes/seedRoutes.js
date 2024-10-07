import express from 'express';
import { seedDatabase } from '../controllers/seedController.js';

const router = express.Router();

// Route to initialize the database
router.get('/seed', seedDatabase);

export default router;
