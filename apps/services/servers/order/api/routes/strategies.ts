import { Router } from 'express';
import getAllStrategiesStartingWithLetter from '../../controller/strategies';

const strategiesRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/strategies', strategiesRouter);
  strategiesRouter.get('/', getAllStrategiesStartingWithLetter);
};
