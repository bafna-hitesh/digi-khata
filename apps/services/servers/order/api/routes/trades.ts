import { Router } from 'express';
import { updateTrade } from '../../controller/trades';

const tradesRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/trades', tradesRouter);
  tradesRouter.put('/:tradeID', updateTrade);
};
