import { Router } from 'express';
import { zerodhaLogin } from '../../controller/auth';
const callbackRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/callback', callbackRouter);
  callbackRouter.get('/zerodha', zerodhaLogin);
};
