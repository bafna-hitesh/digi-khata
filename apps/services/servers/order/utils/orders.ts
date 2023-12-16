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

const formatKiteOrders = async (orders: IKiteOrder[], userId: string) => {
  // Format orders to include userId, brokerName (default KITE) and orderDate
  const commonFields = { userId, orderDate: new Date() };
  const formattedKiteOrders = orders.map((order) => {
    return Object.assign({}, order, commonFields);
  });
  return formattedKiteOrders;
};

const formatUpstoxOrders = async (orders: IUpstoxOrder[], userId: string) => {
  // Format orders to include userId, brokerName (default UPSTOX) and orderDate
  const commonFields = { userId, orderDate: new Date() };
  const formattedUpstoxOrders = orders.map((order) => {
    return Object.assign({}, order, commonFields);
  });
  return formattedUpstoxOrders;
};

// Format the orders to include the userId, brokerName and orderDate and returns the formatted orders
const formatOrdersBasedOnBroker = (orders: IKiteOrder[] | IUpstoxOrder[], userId: string, brokerName: string) => {
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

export default processOrders;
