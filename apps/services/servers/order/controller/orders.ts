import { Request, Response } from 'express';
import { Mistake } from '../models/Mistake';
import { Strategy } from '../models/Strategy';
import { getOrderBasedOnBroker, getAllOrderDataBasedOnBroker, getAllOrdersForUser } from '../utils/orders';
import { decodeJWT, isJwtExpired } from '../../user/utils/authUtils';
import BrokerAccount from '../../user/models/Broker';
import { produceDataToKafka } from '../loaders/kafka';
import { findMistakesToCreate, findMistakesToDelete, getAllMistakesForOrderBasedOnBroker } from '../utils/mistakes';
import {
  findStrategiesToCreate,
  findStrategiesToDelete,
  getAllStrategiesForOrderBasedOnBroker,
} from '../utils/strategies';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

const updateOrder = async (req: Request, res: Response) => {
  try {
    // 1. Check for order
    // 2. For each mistake, check if already exists otherwise create it
    // 3. Add mistake to order
    // 4. Do the same for strategy

    const orderId = req?.params?.orderId;
    const orderBody = req?.body;
    const broker = req?.query?.broker;

    if (!orderId || !broker || !Array.isArray(orderBody?.mistakes) || !Array.isArray(orderBody?.strategies)) {
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
    const orderToUpdate: any = await getOrderBasedOnBroker(orderId, broker as string, userId);

    if (orderToUpdate === null) {
      return res.status(400).json({
        message: 'Invalid order',
      });
    }

    let newMistakes = orderBody.mistakes;
    let newStrategies = orderBody.strategies;

    // Convert all elements of new mistakes to lower case
    newMistakes = newMistakes.map((element: string) => {
      return element.toLowerCase();
    });

    // Convert all elements of new strategies to lower case
    newStrategies = newStrategies.map((element: string) => {
      return element.toLowerCase();
    });

    const currentMistakes: any = await getAllMistakesForOrderBasedOnBroker(orderId, broker as string, userId);
    const currentStrategies: any = await getAllStrategiesForOrderBasedOnBroker(orderId, broker as string, userId);

    // TODO - Create new type for mistake that are get from orders
    const currentMistakeTags = currentMistakes?.Mistakes.map((mistake: any) => {
      return mistake?.tag;
    });

    // TODO - Create new type for strategy that are get from orders
    const currentStrategyTags = currentStrategies?.Strategies.map((strategy: any) => {
      return strategy?.tag;
    });

    // Find mistakes/strategies to delete based on current mistakes/strategies and new mistakes/strategies
    const mistakesToDelete = findMistakesToDelete(currentMistakeTags, newMistakes);
    const strategiesToDelete = findStrategiesToDelete(currentStrategyTags, newStrategies);

    // Find mistakes/strategies to create based on current mistakes/strategies and new mistakes/strategies
    const mistakesToCreate = findMistakesToCreate(currentMistakeTags, newMistakes);
    const strategiesToCreate = findStrategiesToCreate(currentStrategyTags, newStrategies);

    // Loop through mistakes and add it to order
    mistakesToCreate.map(async (tag: string) => {
      // Check if current mistake is already added
      const mistake = await Mistake.findOrCreateMistake(tag);

      // Adding mistake to order
      await orderToUpdate.addMistake(mistake);
    });

    // Loop through strategies and add it to order
    strategiesToCreate.map(async (tag: string) => {
      const strategy = await Strategy.findOrCreateStrategy(tag);

      // Adding strategy to order
      await orderToUpdate.addStrategy(strategy);
    });

    // Delete all mistakes that needs to be deleted from order
    mistakesToDelete.map(async (tag: string) => {
      const mistake = await Mistake.getMistakeDetails(tag);
      await orderToUpdate.removeMistake(mistake);
    });

    // Delete all strategies that needs to be deleted from order
    strategiesToDelete.map(async (tag: string) => {
      const strategy = await Strategy.getStrategyDetails(tag);
      await orderToUpdate.removeStrategy(strategy);
    });

    return res.status(200).json({
      message: `Successfully updated Order with orderId: ${orderId}`,
    });
  } catch (err) {
    console.log('Error Occurred while updating order ', err);
    return res.status(500).json({
      message: 'Some Error Occured while updating order',
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req?.params?.orderId;
    const broker = req?.query?.broker;

    if (!broker || !orderId) {
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

    const orderData = await getAllOrderDataBasedOnBroker(orderId, broker as string, userId);

    if (!orderData) {
      return res.status(400).json({
        message: 'Invalid Order',
      });
    }

    return res.status(200).json(orderData);
  } catch (err) {
    return res.status(500).json({
      message: `Some Error Occured while getting all data for a order`,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
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
    const ordersData = await getAllOrdersForUser(broker as string, userId);

    return res.status(200).json(ordersData);
  } catch (err) {
    console.log('Some Error Occured while getting all orders: ', err);
    return res.status(500).json({
      message: 'Some Error Occured while getting all orders',
    });
  }
};

const syncOrders = async (req: Request, res: Response) => {
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
    await produceDataToKafka('orders', data, userId);

    return res.status(200).json({
      message: `Syncing ${broker} orders in background`,
    });
  } catch (err) {
    console.log('Some Error Occured while syncing orders: ', err);
    return res.status(500).json({
      message: 'Some Error Occured while syncing orders',
    });
  }
};

export { updateOrder, getOrder, getAllOrders, syncOrders };
