import { upstox, zerodha } from '@digi/brokers';
import getUserDataFromRedis from './authUtils';
import config from '../config';
import Order, { IOrder } from '../models/Order';

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
    throw new Error('Invalid Broker Name');
  }

  return orders;
};

const insertOrdersToPostgres = async (orders: IOrder[]) => {
  await Order.bulkCreate(orders);
};

// Format the orders to include the userId, brokerName and orderDate and returns the formatted orders
const formatOrders = async (orders: IOrder[], userId: string, brokerName: string) => {
  // Format orders to include userId, brokerName and orderDate
  const formattedOrders = orders.map((order) => {
    const newOrder = { ...order };
    newOrder.userId = userId;
    newOrder.brokerName = brokerName;
    newOrder.orderDate = new Date();
    return newOrder;
  });

  return formattedOrders;
};

const processOrders = async (accessToken: string) => {
  // Check accessToken in Redis if it exists and get userId and broker tokens from accessToken
  const userData = await getUserDataFromRedis(accessToken);

  // Fetch Orders for each brokers
  const brokersDetails = userData.brokerTokens;

  // eslint-disable-next-line no-restricted-syntax
  for await (const broker of brokersDetails) {
    let orders = await getOrdersBasedOnBroker(broker);

    // Format Orders
    orders = formatOrders(orders, userData.userId, broker);

    // Bulk Insert into postgres
    insertOrdersToPostgres(orders);
  }
};

export default processOrders;
