import { KiteOrder } from '../models/KiteOrder';
import { UpstoxOrder } from '../models/UpstoxOrder';
import { KiteTrade } from '../models/KiteTrade';
import { UpstoxTrade } from '../models/UpstoxTrade';

const getAllStrategiesForOrderBasedOnBroker = async (orderId: string, broker: string, userId: string) => {
  let strategies;
  if (broker === 'KITE') {
    strategies = KiteOrder.getAllStrategiesForOrder(orderId, userId);
  } else if (broker === 'UPSTOX') {
    strategies = UpstoxOrder.getAllStrategiesForOrder(orderId, userId);
  } else {
    throw new Error(`Invalid Broker: ${broker}`);
  }
  return strategies;
};

const getAllStrategiesForTradeBasedOnBroker = async (orderId: string, broker: string, userId: string) => {
  let strategies;
  if (broker === 'KITE') {
    strategies = await KiteTrade.getAllStrategiesForTrade(orderId, userId);
  } else if (broker === 'UPSTOX') {
    strategies = await UpstoxTrade.getAllStrategiesForTrade(orderId, userId);
  } else {
    throw new Error(`Invalid Broker: ${broker}`);
  }
  return strategies;
};

const findStrategiesToDelete = (currentStrategies: string[], newStrategies: string[]) => {
  const strategiesToDelete = currentStrategies.filter((tag: string) => {
    return newStrategies.indexOf(tag) === -1;
  });
  return strategiesToDelete;
};

const findStrategiesToCreate = (currentStrategies: string[], newStrategies: string[]) => {
  const strategiesToCreate = newStrategies.filter((tag: string) => {
    return currentStrategies.indexOf(tag) === -1;
  });
  return strategiesToCreate;
};

export {
  getAllStrategiesForOrderBasedOnBroker,
  getAllStrategiesForTradeBasedOnBroker,
  findStrategiesToCreate,
  findStrategiesToDelete,
};
