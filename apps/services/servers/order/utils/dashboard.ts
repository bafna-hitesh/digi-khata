import { KiteTrade } from '../models/KiteTrade';
import { UpstoxTrade } from '../models/UpstoxTrade';

const getTradesBasedOnBroker = async (
  brokerName: string,
  userId: string,
  startDate: Date,
  endDate: Date,
  segment: string,
) => {
  let data;

  if (brokerName === 'KITE') {
    data = await KiteTrade.findAllTrades(userId, startDate, endDate, segment);
  } else if (brokerName === 'UPSTOX') {
    data = await UpstoxTrade.findAllTrades(userId, startDate, endDate, segment);
  } else {
    throw new Error(`Invalid Broker for getting trades based on broker: ${brokerName}`);
  }
  return data;
};

export default getTradesBasedOnBroker;
