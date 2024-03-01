import { Router } from 'express';
import { createOrUpdateJournal, getJournal } from '../../controller/journal';

const journalRouter = Router();

export default (baseRouter: Router) => {
  baseRouter.use('/journal', journalRouter);
  journalRouter.get('/:tradeId', getJournal);
  journalRouter.put('/:tradeId', createOrUpdateJournal);
};
