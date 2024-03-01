/* eslint-disable prefer-object-spread */
import { upstox, zerodha } from '@digi/brokers';
import memoizedGetUserDataFromRedis from '@digi/redis';
import config from '../config';
import { KiteOrder, IKiteOrder } from '../models/KiteOrder';
import { UpstoxOrder, IUpstoxOrder } from '../models/UpstoxOrder';
import redisClient from '../../user/loaders/redis';

interface IBroker {
  brokerName: string;
  accessTokens: {
    accessToken?: string;
    refreshToken?: string;
    publicToken?: string;
  };
}

const getOrdersBasedOnBroker = async (brokerDetails: IBroker) => {
  let orders;
  if (brokerDetails.brokerName === 'ZERODHA') {
    orders = await zerodha.kiteOrders.getAllOrdersForTheDay({
      apiKey: config.KITE_API_KEY,
      accessToken: brokerDetails?.accessTokens?.accessToken as string,
    });
  } else if (brokerDetails.brokerName === 'UPSTOX') {
    orders = await upstox.upstoxOrders.getAllOrdersForTheDay(brokerDetails?.accessTokens?.accessToken as string);
  } else {
    throw new Error(`Invalid Broker Name: ${brokerDetails.brokerName}`);
  }

  return orders;
};

const formatKiteOrders = async (orders: Partial<IKiteOrder>[], userId: string) => {
  // Todo - Create a separate type for trade without userId, brokerName, orderDate and segment
  // Format orders to include userId, brokerName (default KITE), orderDate and segment
  const commonFields = { userId, orderDate: new Date(), brokerName: 'KITE', segment: '' };
  const formattedKiteOrders = orders.map((order) => {
    commonFields.segment = zerodha.kiteTrades.getTradeTypeFromTradingSymbol(order?.tradingsymbol as string);
    return Object.assign({}, order, commonFields);
  });
  return formattedKiteOrders as IKiteOrder[];
};

const formatUpstoxOrders = async (orders: Partial<IUpstoxOrder>[], userId: string) => {
  // Format orders to include userId, brokerName (default UPSTOX), orderDate and segment
  const commonFields = { userId, orderDate: new Date(), brokerName: 'UPSTOX', segment: '' };
  const formattedUpstoxOrders = orders.map((order) => {
    commonFields.segment = upstox.upstoxOrders.getOrderTypeFromTradingSymbol(order?.trading_symbol as string);
    return Object.assign({}, order, commonFields);
  });
  return formattedUpstoxOrders as IUpstoxOrder[];
};

// Format the orders to include the userId, brokerName and orderDate and returns the formatted orders
const formatOrdersBasedOnBroker = (
  orders: Partial<IKiteOrder>[] | Partial<IUpstoxOrder>[],
  userId: string,
  brokerName: string,
) => {
  let formattedOrders;
  if (brokerName === 'KITE') {
    formattedOrders = formatKiteOrders(orders as IKiteOrder[], userId);
  } else if (brokerName === 'UPSTOX') {
    formattedOrders = formatUpstoxOrders(orders as IUpstoxOrder[], userId);
  }
  return formattedOrders;
};

const bulkInsertOrdersToPostgres = async (
  orders: IKiteOrder[] | IUpstoxOrder[],
  brokerName: string,
  userId: string,
) => {
  if (brokerName === 'KITE') {
    KiteOrder.createBulkOrders(orders as IKiteOrder[], userId);
  } else if (brokerName === 'UPSTOX') {
    UpstoxOrder.createBulkOrders(orders as IUpstoxOrder[], userId);
  } else {
    throw new Error(`Invalid Broker Name: ${brokerName}`);
  }
};

const processOrders = async (accessToken: string) => {
  // Check accessToken in Redis if it exists and get userId and broker tokens from accessToken
  const userData = await memoizedGetUserDataFromRedis(accessToken, redisClient);

  // Fetch Orders for each brokers
  const brokersDetails = userData.brokerTokens;

  // eslint-disable-next-line no-restricted-syntax
  for await (const broker of brokersDetails) {
    let orders = await getOrdersBasedOnBroker(broker);

    // Format Orders
    orders = formatOrdersBasedOnBroker(orders, userData.userId, broker.brokerName);

    // Bulk Insert into postgres
    bulkInsertOrdersToPostgres(orders, broker.brokerName, userData.userId);
  }
};

const getOrderBasedOnBroker = async (orderId: string, broker: string, userId: string) => {
  let order;
  if (broker === 'KITE') {
    order = await KiteOrder.findOrder(orderId, userId);
  } else if (broker === 'UPSTOX') {
    order = await UpstoxOrder.findOrder(orderId, userId);
  } else {
    throw new Error(`Invalid broker: ${broker} when getting order based on broker`);
  }
  return order;
};

const getAllOrderDataBasedOnBroker = async (orderId: string, broker: string, userId: string) => {
  let orderData;
  if (broker === 'KITE') {
    orderData = await KiteOrder.getAllDataForOrder(orderId, userId);
  } else if (broker === 'UPSTOX') {
    orderData = await UpstoxOrder.getAllDataForOrder(orderId, userId);
  } else {
    throw new Error(`Invalid broker: ${broker} when getting all order data based on broker`);
  }
  return orderData;
};

const getAllOrdersForUser = async (broker: string, userId: string) => {
  let orderData;
  if (broker === 'KITE') {
    orderData = await KiteOrder.getAllOrdersForUser(userId);
  } else if (broker === 'UPSTOX') {
    orderData = await UpstoxOrder.getAllOrdersForUser(userId);
  } else {
    throw new Error(`Invalid broker: ${broker} when getting all orders for user: ${userId}`);
  }
  return orderData;
};

export {
  processOrders,
  getOrderBasedOnBroker,
  getAllOrderDataBasedOnBroker,
  getAllOrdersForUser,
  formatKiteOrders,
  formatUpstoxOrders,
  bulkInsertOrdersToPostgres,
};
