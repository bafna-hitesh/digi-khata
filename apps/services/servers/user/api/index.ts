import { Router } from 'express';
import auth from './routes/auth';
import callback from './routes/callback';
import waitlist from './routes/waitlist';
import balance from './routes/balance';

export default () => {
  const router = Router();
  auth(router);
  callback(router);
  waitlist(router);
  balance(router);
  return router;
};
