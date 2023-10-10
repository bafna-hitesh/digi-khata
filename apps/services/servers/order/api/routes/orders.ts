import { Router } from 'express';
import { tradesUploadToKafka, tradesSyncToPostgres } from '../../controller/orders';
const ordersRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/trades', ordersRouter);
  ordersRouter.get('/upload', tradesUploadToKafka);
  ordersRouter.get('/sync', tradesSyncToPostgres);
};
