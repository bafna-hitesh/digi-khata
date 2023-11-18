import { Router } from 'express';
import { zerodhaInitialLogin } from '../../controller/auth';

const authRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/auth/login', authRouter);
  authRouter.get('/zerodha', zerodhaInitialLogin);
};
