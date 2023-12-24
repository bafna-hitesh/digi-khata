import { Router } from 'express';
import trades from './routes/trades';
import orders from './routes/orders';

export default () => {
  const router = Router();
  trades(router);
  orders(router);
  return router;
};
