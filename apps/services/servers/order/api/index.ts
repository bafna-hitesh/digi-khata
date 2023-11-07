import { Router } from 'express';
import trades from './routes/trades';

export default () => {
  const router = Router();
  trades(router);
  return router;
};
