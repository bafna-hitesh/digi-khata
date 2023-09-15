import { Router } from 'express';
import { ordersUpload } from '../../controller/orders';
const ordersRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/orders', ordersRouter);
  ordersRouter.post('/upload', ordersUpload);
};
