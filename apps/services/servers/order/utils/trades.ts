/* eslint-disable prefer-object-spread */
import { upstox, zerodha } from '@digi/brokers';
import memoizedGetUserDataFromRedis from '@digi/redis';
import config from '../config';
import { KiteTrade, IKiteTrade } from '../models/KiteTrade';
import { UpstoxTrade, IUpstoxTrade } from '../models/UpstoxTrade';
import redisClient from '../loaders/redis';

interface IBroker {
  brokerName: string;
  accessTokens: {
    accessToken?: string;
    refreshToken?: string;
    publicToken?: string;
  };
}

const getTradesBasedOnBroker = async (brokerDetails: IBroker) => {
  let trades;
  if (brokerDetails.brokerName === 'ZERODHA') {
    trades = await zerodha.kiteTrades.getAllTradesForTheDay({
      apiKey: config.KITE_API_KEY,
      accessToken: brokerDetails?.accessTokens?.accessToken as string,
    });
  } else if (brokerDetails.brokerName === 'UPSTOX') {
    trades = await upstox.upstoxTrades.getAllTradesForTheDay(brokerDetails?.accessTokens?.accessToken as string);
  } else {
    throw new Error(`Invalid Broker Name: ${brokerDetails.brokerName}`);
  }

  return trades;
};

const formatKiteTrades = async (trades: IKiteTrade[], userId: string) => {
  // Format trades to include userId, brokerName (default KITE) and tradeDate
  const commonFields = { userId, tradeDate: new Date() };
  const formattedKiteTrades = trades.map((trade) => {
    return Object.assign({}, trade, commonFields);
  });
  return formattedKiteTrades;
};

const formatUpstoxTrades = async (trades: IUpstoxTrade[], userId: string) => {
  // Format trades to include userId, brokerName (default UPSTOX) and tradeDate
  const commonFields = { userId, tradeDate: new Date() };
  const formattedUpstoxTrades = trades.map((trade) => {
    return Object.assign({}, trade, commonFields);
  });
  return formattedUpstoxTrades;
};

// Format the trades to include the userId, brokerName and tradeDate and returns the formatted trades
const formatTradesBasedOnBroker = async (trades: IKiteTrade[] | IUpstoxTrade[], userId: string, brokerName: string) => {
  let formattedTrades;
  if (brokerName === 'KITE') {
    formattedTrades = formatKiteTrades(trades as IKiteTrade[], userId);
  } else if (brokerName === 'UPSTOX') {
    formattedTrades = formatUpstoxTrades(trades as IUpstoxTrade[], userId);
  }
  return formattedTrades;
};

const bulkInsertTradesToPostgres = async (
  trades: IKiteTrade[] | IUpstoxTrade[],
  brokerName: string,
  userId: string,
) => {
  if (brokerName === 'KITE') {
    KiteTrade.createBulkTrades(trades as IKiteTrade[], userId);
  } else if (brokerName === 'UPSTOX') {
    UpstoxTrade.createBulkTrades(trades as IUpstoxTrade[], userId);
  } else {
    throw new Error(`Invalid Broker Name: ${brokerName}`);
  }
};

const processTrades = async (accessToken: string) => {
  // Check accessToken in Redis if it exists and get userId and broker tokens from accessToken
  const userData = await memoizedGetUserDataFromRedis(accessToken, redisClient);

  // Fetch Trades for each brokers
  const brokersDetails = userData.brokerTokens;

  // eslint-disable-next-line no-restricted-syntax
  for await (const broker of brokersDetails) {
    let trades = await getTradesBasedOnBroker(broker);

    // Format Trades
    trades = formatTradesBasedOnBroker(trades, userData.userId, broker);

    // Bulk Insert into postgres
    bulkInsertTradesToPostgres(trades, broker.brokerName, userData.userId);
  }
};

export default processTrades;
