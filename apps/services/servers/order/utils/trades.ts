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
    throw new Error(`Invalid Broker Name: ${brokerDetails.brokerName} when getting trades on a day`);
  }

  return trades;
};

const formatKiteTrades = async (trades: Partial<IKiteTrade>[], userId: string) => {
  // Todo - Create a separate type for trade without userId, brokerName, tradeDate and segment
  // Format trades to include userId, brokerName (default KITE), tradeDate and segment
  const commonFields = { userId, tradeDate: new Date(), brokerName: 'KITE', segment: '' };
  const formattedKiteTrades = trades.map((trade) => {
    commonFields.segment = zerodha.kiteTrades.getTradeTypeFromTradingSymbol(trade?.tradingsymbol as string);
    return Object.assign({}, trade, commonFields);
  });
  return formattedKiteTrades as IKiteTrade[];
};

const formatUpstoxTrades = async (trades: Partial<IUpstoxTrade>[], userId: string) => {
  // Format trades to include userId, brokerName (default UPSTOX), tradeDate and segment
  const commonFields = { userId, tradeDate: new Date(), brokerName: 'UPSTOX', segment: '' };
  const formattedUpstoxTrades = trades.map((trade) => {
    commonFields.segment = upstox.upstoxTrades.getTradeTypeFromTradingSymbol(trade?.trading_symbol as string);
    return Object.assign({}, trade, commonFields);
  });
  return formattedUpstoxTrades as IUpstoxTrade[];
};

// Format the trades to include the userId, brokerName and tradeDate and returns the formatted trades
const formatTradesBasedOnBroker = async (
  trades: Partial<IKiteTrade>[] | Partial<IUpstoxTrade>[],
  userId: string,
  brokerName: string,
) => {
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
    throw new Error(`Invalid Broker Name: ${brokerName} when inserting trade for user: ${userId}`);
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

const getTradeBasedOnBroker = async (tradeId: string, broker: string, userId: string) => {
  let tradeData;
  if (broker === 'KITE') {
    tradeData = await KiteTrade.findTrade(tradeId, userId);
  } else if (broker === 'UPSTOX') {
    tradeData = await UpstoxTrade.findTrade(tradeId, userId);
  } else {
    throw new Error(`Invalid broker: ${broker} when getting trade based on broker for user: ${userId}`);
  }
  return tradeData;
};

const getAllTradeDataBasedOnBroker = async (tradeId: string, broker: string, userId: string) => {
  let tradeData;
  if (broker === 'KITE') {
    tradeData = await KiteTrade.getAllDataForTrade(tradeId, userId);
  } else if (broker === 'UPSTOX') {
    tradeData = await UpstoxTrade.getAllDataForTrade(tradeId, userId);
  } else {
    throw new Error(`Invalid broker: ${broker} when getting all trade data based on broker for user: ${userId}`);
  }
  return tradeData;
};

const getAllTradesForUser = async (broker: string, userId: string) => {
  let tradeData;
  if (broker === 'KITE') {
    tradeData = await KiteTrade.getAllTradesForUser(userId);
  } else if (broker === 'UPSTOX') {
    tradeData = await UpstoxTrade.getAllTradesForUser(userId);
  } else {
    throw new Error(`Invalid broker: ${broker} when getting all trades for user: ${userId}`);
  }
  return tradeData;
};

export {
  processTrades,
  getTradeBasedOnBroker,
  getAllTradeDataBasedOnBroker,
  getAllTradesForUser,
  formatKiteTrades,
  formatUpstoxTrades,
  bulkInsertTradesToPostgres,
};
