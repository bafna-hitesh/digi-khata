import { Router } from 'express';
import auth from './routes/auth';
import callback from './routes/callback';
import waitlist from './routes/waitlist';

export default () => {
  const router = Router();
  auth(router);
  callback(router);
  waitlist(router);
  return router;
};
