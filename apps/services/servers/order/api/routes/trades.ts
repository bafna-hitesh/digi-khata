import { Router } from 'express';
import { getAllTrades, getTrade, updateTrade } from '../../controller/trades';

const tradesRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/trades', tradesRouter);
  tradesRouter.get('/', getAllTrades);
  tradesRouter.get('/:tradeId', getTrade);
  tradesRouter.put('/:tradeId', updateTrade);
};
