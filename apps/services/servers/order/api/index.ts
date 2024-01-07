import { Router } from 'express';
import trades from './routes/trades';
import orders from './routes/orders';
import mistakes from './routes/mistakes';
import strategies from './routes/strategies';

export default () => {
  const router = Router();
  trades(router);
  orders(router);
  mistakes(router);
  strategies(router);
  return router;
};
