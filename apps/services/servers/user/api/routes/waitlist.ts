import { Router } from 'express';
import waitlist from '../../controller/waitlist';

const waitListRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/', waitListRouter);
  waitListRouter.post('/waitlist', waitlist);
};
