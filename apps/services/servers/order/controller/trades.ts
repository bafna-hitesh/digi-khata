import { Request, Response } from 'express';
import Mistake from '../models/Mistake';
import Strategy from '../models/Strategy';
import { getAllTradeDataBasedOnBroker, getAllTradesForUser, getTradeBasedOnBroker } from '../utils/trades';
import { decodeJWT, isJwtExpired } from '../../user/utils/authUtils';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

const updateTrade = async (req: Request, res: Response) => {
  try {
    // 1. Check for trade
    // 2. For each mistake, check if already exists otherwise create it
    // 3. Add mistake to trade
    // 4. Do the same for strategy

    const tradeId = req?.params?.tradeId;
    const tradeBody = req?.body;
    const broker = req?.query?.broker;

    if (!tradeId || !broker || !Array.isArray(tradeBody?.mistakes) || !Array.isArray(tradeBody?.strategies)) {
      return res.status(400).json({
        message: 'Invalid Input',
      });
    }

    let accessToken = req?.cookies?.accessToken;

    if (isJwtExpired(accessToken)) {
      accessToken = req?.cookies?.refreshToken;
    }

    const decodedJwt = (await decodeJWT(accessToken)) as JwtPayload;
    const userId = decodedJwt?.userId;

    if (!userId) {
      return res.status(403).json({
        message: 'Invalid Access or Refresh Token',
      });
    }

    // Todo: Using any below because TypeScript is not recognising the associative functions on KiteTrade and Mistake or vice-versa.
    // Need to resolve it
    const tradeToUpdate: any = await getTradeBasedOnBroker(tradeId, broker as string, userId);

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
      message: `Successfully updated trade with tradeID: ${tradeId}`,
    });
  } catch (err) {
    console.log('Error Occurred while updating trade ', err);
    return res.status(500).json({
      message: 'Some Error Occured while updating trade',
    });
  }
};

const getTrade = async (req: Request, res: Response) => {
  try {
    const tradeId = req?.params?.tradeId;
    const broker = req?.query?.broker;

    if (!broker || !tradeId) {
      return res.status(400).json({
        message: 'Invalid Input',
      });
    }

    let accessToken = req?.cookies?.accessToken;

    if (isJwtExpired(accessToken)) {
      accessToken = req?.cookies?.refreshToken;
    }

    const decodedJwt = (await decodeJWT(accessToken)) as JwtPayload;
    const userId = decodedJwt?.userId;

    if (!userId) {
      return res.status(403).json({
        message: 'Invalid Access or Refresh Token',
      });
    }

    const tradeData = await getAllTradeDataBasedOnBroker(tradeId, broker as string, userId);

    if (!tradeData) {
      return res.status(400).json({
        message: 'Invalid Trade',
      });
    }

    return res.status(200).json(tradeData);
  } catch (err) {
    console.log('Some Error Occured while getting all data for a trade: ', err);
    return res.status(500).json({
      message: 'Some Error Occured while getting all data for a trade',
    });
  }
};

const getAllTrades = async (req: Request, res: Response) => {
  try {
    const broker = req?.query?.broker;

    if (!broker) {
      return res.status(400).json({
        message: 'Invalid Input',
      });
    }

    let accessToken = req?.cookies?.accessToken;

    if (isJwtExpired(accessToken)) {
      accessToken = req?.cookies?.refreshToken;
    }

    const decodedJwt = (await decodeJWT(accessToken)) as JwtPayload;
    const userId = decodedJwt?.userId;

    if (!userId) {
      return res.status(403).json({
        message: 'Invalid Access or Refresh Token',
      });
    }

    const tradesData = await getAllTradesForUser(broker as string, userId);

    return res.status(200).json(tradesData);
  } catch (err) {
    console.log('Some Error Occured while getting all trades: ', err);
    return res.status(500).json({
      message: 'Some Error Occured while getting all trades',
    });
  }
};

export { updateTrade, getTrade, getAllTrades };
