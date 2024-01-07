import { Router } from 'express';
import journal from './routes/journal';

export default () => {
  const router = Router();
  journal(router);
  return router;
};
