import { upstox, zerodha } from '@digi/brokers';
import Trade, { ITrade } from '../models/Trade';
import getUserDataFromRedis from './authUtils';
import config from '../config';

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
    throw new Error('Invalid Broker Name');
  }

  return trades;
};

const insertTradesToPostgres = async (trades: ITrade[]) => {
  await Trade.bulkCreate(trades);
};

// Format the trades to include the userId, brokerName and tradeDate and returns the formatted trades
const formatTrades = async (trades: ITrade[], userId: string, brokerName: string) => {
  // Format trades to include userId, brokerName and tradeDate
  const formattedTrades = trades.map((trade) => {
    const newTrade = { ...trade };
    newTrade.userId = userId;
    newTrade.brokerName = brokerName;
    newTrade.tradeDate = new Date();
    return newTrade;
  });

  return formattedTrades;
};

const processTrades = async (accessToken: string) => {
  // Check accessToken in Redis if it exists and get userId and broker tokens from accessToken
  const userData = await getUserDataFromRedis(accessToken);

  // Fetch Trades for each brokers
  const brokersDetails = userData.brokerTokens;

  // eslint-disable-next-line no-restricted-syntax
  for await (const broker of brokersDetails) {
    let trades = await getTradesBasedOnBroker(broker);

    // Format Trades
    trades = formatTrades(trades, userData.userId, broker);

    // Bulk Insert into postgres
    insertTradesToPostgres(trades);
  }
};

export default processTrades;
