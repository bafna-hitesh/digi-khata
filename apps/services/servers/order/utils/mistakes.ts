import { KiteOrder } from '../models/KiteOrder';
import { UpstoxOrder } from '../models/UpstoxOrder';
import { KiteTrade } from '../models/KiteTrade';
import { UpstoxTrade } from '../models/UpstoxTrade';

const getAllMistakesForOrderBasedOnBroker = async (orderId: string, broker: string, userId: string) => {
  let mistakes;
  if (broker === 'KITE') {
    mistakes = await KiteOrder.getAllMistakesForOrder(orderId, userId);
  } else if (broker === 'UPSTOX') {
    mistakes = await UpstoxOrder.getAllMistakesForOrder(orderId, userId);
  } else {
    throw new Error(`Invalid Broker: ${broker}`);
  }
  return mistakes;
};

const getAllMistakesForTradeBasedOnBroker = async (orderId: string, broker: string, userId: string) => {
  let mistakes;
  if (broker === 'KITE') {
    mistakes = await KiteTrade.getAllMistakesForTrade(orderId, userId);
  } else if (broker === 'UPSTOX') {
    mistakes = await UpstoxTrade.getAllMistakesForTrade(orderId, userId);
  } else {
    throw new Error(`Invalid Broker: ${broker}`);
  }
  return mistakes;
};

const findMistakesToDelete = (currentMistakes: string[], newMistakes: string[]) => {
  const mistakesToDelete = currentMistakes.filter((tag: string) => {
    return newMistakes.indexOf(tag) === -1;
  });
  return mistakesToDelete;
};

const findMistakesToCreate = (currentMistakes: string[], newMistakes: string[]) => {
  const mistakesToCreate = newMistakes.filter((tag: string) => {
    return currentMistakes.indexOf(tag) === -1;
  });
  return mistakesToCreate;
};

export {
  getAllMistakesForOrderBasedOnBroker,
  getAllMistakesForTradeBasedOnBroker,
  findMistakesToCreate,
  findMistakesToDelete,
};
