import { Router } from 'express';
import * as dividendController from '../controllers/stock/dividendController';

const router = Router();

//router.get('/getAll', dividendController.getAllStocks);
router.get('/get/:ticker', dividendController.calculateMetrics);

export default router;