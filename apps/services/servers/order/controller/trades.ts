import { Request, Response } from 'express';
import { Mistake } from '../models/Mistake';
import { Strategy } from '../models/Strategy';
import { getAllTradeDataBasedOnBroker, getAllTradesForUser, getTradeBasedOnBroker } from '../utils/trades';
import { decodeJWT, isJwtExpired } from '../../user/utils/authUtils';
import BrokerAccount from '../../user/models/Broker';
import { produceDataToKafka } from '../loaders/kafka';
import { findMistakesToCreate, findMistakesToDelete, getAllMistakesForTradeBasedOnBroker } from '../utils/mistakes';
import {
  findStrategiesToCreate,
  findStrategiesToDelete,
  getAllStrategiesForTradeBasedOnBroker,
} from '../utils/strategies';

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

    let newMistakes = tradeBody.mistakes;
    let newStrategies = tradeBody.strategies;

    // Convert all elements of new mistakes to lower case
    newMistakes = newMistakes.map((element: string) => {
      return element.toLowerCase();
    });

    // Convert all elements of new strategies to lower case
    newStrategies = newStrategies.map((element: string) => {
      return element.toLowerCase();
    });

    const currentMistakes: any = await getAllMistakesForTradeBasedOnBroker(tradeId, broker as string, userId);
    console.log(`Current Mistakes`, JSON.stringify(currentMistakes));
    const currentStrategies: any = await getAllStrategiesForTradeBasedOnBroker(tradeId, broker as string, userId);

    // TODO - Create new type for mistake that are get from trades
    const currentMistakeTags = currentMistakes?.Mistakes.map((mistake: any) => {
      return mistake?.tag;
    });

    // TODO - Create new type for strategy that are get from trades
    const currentStrategyTags = currentStrategies?.Strategies.map((strategy: any) => {
      return strategy?.tag;
    });

    // Find mistakes/strategies to delete based on current mistakes/strategies and new mistakes/strategies
    const mistakesToDelete = findMistakesToDelete(currentMistakeTags, newMistakes);
    const strategiesToDelete = findStrategiesToDelete(currentStrategyTags, newStrategies);

    // Find mistakes/strategies to create based on current mistakes/strategies and new mistakes/strategies
    const mistakesToCreate = findMistakesToCreate(currentMistakeTags, newMistakes);
    const strategiesToCreate = findStrategiesToCreate(currentStrategyTags, newStrategies);

    // Loop through mistakes and add it to trade
    mistakesToCreate.map(async (tag: string) => {
      // Check if current mistake is already added
      const mistake = await Mistake.findOrCreateMistake(tag);

      // Adding mistake to trade
      await tradeToUpdate.addMistake(mistake);
    });

    // Loop through strategies and add it to trade
    strategiesToCreate.map(async (tag: string) => {
      const strategy = await Strategy.findOrCreateStrategy(tag);

      // Adding strategy to trade
      await tradeToUpdate.addStrategy(strategy);
    });

    // Delete all mistakes that needs to be deleted from trade
    mistakesToDelete.map(async (tag: string) => {
      const mistake = await Mistake.getMistakeDetails(tag);
      await tradeToUpdate.removeMistake(mistake);
    });

    // Delete all strategies that needs to be deleted from trade
    strategiesToDelete.map(async (tag: string) => {
      const strategy = await Strategy.getStrategyDetails(tag);
      await tradeToUpdate.removeStrategy(strategy);
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

const syncTrades = async (req: Request, res: Response) => {
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

    const brokerTokens = await BrokerAccount.getActiveBrokerTokens(userId);

    const data = {
      tokens: brokerTokens,
    };
    await produceDataToKafka('trades', data, userId);

    return res.status(200).json({
      message: `Syncing ${broker} trades in background`,
    });
  } catch (err) {
    console.log('Some Error Occured while syncing trades: ', err);
    return res.status(500).json({
      message: 'Some Error Occured while syncing trades',
    });
  }
};

export { updateTrade, getTrade, getAllTrades, syncTrades };
