import { Router } from 'express';
import auth from './routes/auth';
import callback from './routes/callback';

export default () => {
  const router = Router();
  auth(router);
  callback(router);
  return router;
};
