import { Router } from 'express';
import { getAllOrders, getOrder, updateOrder } from '../../controller/orders';

const ordersRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/orders', ordersRouter);
  ordersRouter.get('/', getAllOrders);
  ordersRouter.get('/:orderId', getOrder);
  ordersRouter.put('/:orderId', updateOrder);
};
