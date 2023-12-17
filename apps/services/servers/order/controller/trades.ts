import { NextFunction, Request, Response } from 'express';
import Trade from '../models/Trade';
import Mistake from '../models/Mistake';
import Strategy from '../models/Strategy';

const updateTrade = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Check for trade
    // 2. For each mistake, check if already exists otherwise create it
    // 3. Add mistake to trade
    // 4. Do the same for strategy

    const { tradeID } = req.params;
    const tradeBody = req.body;

    if (!Array.isArray(tradeBody?.mistakes) || !Array.isArray(tradeBody?.strategies)) {
      return res.status(400).json({
        message: 'Invalid Input',
      });
    }

    const tradeToUpdate = await Trade.findOne({
      where: {
        id: tradeID,
      },
    });

    if (tradeToUpdate === null) {
      return res.status(400).json({
        message: 'Invalid Trade',
      });
    }

    const { mistakes, strategies } = tradeBody;

    // Loop through mistakes and add it to trade
    mistakes.map(async (tag: string) => {
      const [mistake] = await Mistake.findOrCreate({
        where: { tag: tag.toLowerCase() },
      });

      // Adding mistake to trade
      await tradeToUpdate.addMistake(mistake);
    });

    // Loop through strategies and add it to trade
    strategies.map(async (tag: string) => {
      const [strategy] = await Strategy.findOrCreate({
        where: { tag: tag.toLowerCase() },
      });

      // Adding strategy to trade
      await tradeToUpdate.addStrategy(strategy);
    });

    return res.status(200).json({
      message: 'Successfully updated trade',
    });
  } catch (err: any) {
    next({
      status: 500,
      message: err.message,
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { updateTrade };
