import express from 'express';
import { getTransactions, getStatistics, getBarChartData, getPieChartData,getCombinedData} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/transactions', getTransactions);

router.get('/statistics/:month', getStatistics);
router.get('/bar-chart/:month', getBarChartData);
router.get('/pie-chart/:month', getPieChartData);

router.get('/combined/:month', getCombinedData);

export default router;
