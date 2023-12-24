import { Request, Response } from 'express';
import Mistake from '../models/Mistake';
import Strategy from '../models/Strategy';
import { getOrderBasedOnBroker, getAllOrderDataBasedOnBroker, getAllOrdersForUser } from '../utils/orders';
import { decodeJWT, isJwtExpired } from '../../user/utils/authUtils';

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

    const { mistakes, strategies } = orderBody;

    // Loop through mistakes and add it to order
    mistakes.map(async (tag: string) => {
      const [mistake] = await Mistake.findOrCreate({
        where: { tag: tag.toLowerCase() },
      });

      // Adding mistake to order
      await orderToUpdate.addMistake(mistake);
    });

    // Loop through strategies and add it to order
    strategies.map(async (tag: string) => {
      const [strategy] = await Strategy.findOrCreate({
        where: { tag: tag.toLowerCase() },
      });

      // Adding strategy to order
      await orderToUpdate.addStrategy(strategy);
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

export { updateOrder, getOrder, getAllOrders };
