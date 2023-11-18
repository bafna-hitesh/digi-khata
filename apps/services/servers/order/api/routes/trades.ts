import { Router } from 'express';
import { tradesUploadToKafka, tradesSyncToPostgres, updateTrade } from '../../controller/trades';

const tradesRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/trades', tradesRouter);
  tradesRouter.get('/upload', tradesUploadToKafka);
  tradesRouter.get('/sync', tradesSyncToPostgres);
  tradesRouter.put('/:tradeID', updateTrade);
};
