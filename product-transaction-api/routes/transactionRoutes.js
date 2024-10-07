import express from 'express';
import { getTransactions, getStatistics, getBarChartData, getPieChartData,getCombinedData} from '../controllers/transactionController.js';

const router = express.Router();

// Route to get transactions
router.get('/transactions', getTransactions);

// Route to get statistics
router.get('/statistics/:month', getStatistics);

// Route to get bar chart data
router.get('/bar-chart/:month', getBarChartData);

// Route to get pie chart data
router.get('/pie-chart/:month', getPieChartData);

// Route to get combined data
router.get('/combined/:month', getCombinedData);

export default router;
