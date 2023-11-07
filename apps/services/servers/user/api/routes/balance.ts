import { Router } from 'express';
import syncKiteBalanceForTheDay from '../../controller/balance';

const tradesRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/balance', tradesRouter);
  tradesRouter.get('/kite/sync', syncKiteBalanceForTheDay);
};
