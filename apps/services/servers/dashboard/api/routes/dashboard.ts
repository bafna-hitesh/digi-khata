import { Router } from 'express';
import { getDashboardData } from '../../controller/dashboard';
const dashboardRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/', dashboardRouter);
  dashboardRouter.get('/dashboard', getDashboardData);
};
