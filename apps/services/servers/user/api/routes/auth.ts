import { Router } from 'express';
import { zerodhaInitialLogin } from '../../controller/auth';

const authRouter = Router();

// the route created with this would be /auth/login/zerodha
export default (baseRouter: Router) => {
  baseRouter.use('/auth/login', authRouter);
  authRouter.get('/zerodha', zerodhaInitialLogin);
};
