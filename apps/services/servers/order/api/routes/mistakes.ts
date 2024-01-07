import { Router } from 'express';
import getAllMistakesStartingWithLetter from '../../controller/mistakes';

const mistakesRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/mistakes', mistakesRouter);
  mistakesRouter.get('/', getAllMistakesStartingWithLetter);
};
