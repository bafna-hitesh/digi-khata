import { kiteOrders, kiteTrades, upstoxOrders, upstoxTrades } from './constants';
import { formatKiteTrades, bulkInsertTradesToPostgres, formatUpstoxTrades } from '../servers/order/utils/trades';
import { bulkInsertOrdersToPostgres, formatKiteOrders, formatUpstoxOrders } from '../servers/order/utils/orders';

const commandLineArgs = process.argv;
const userId = commandLineArgs[2];

if (!userId) {
  console.log('Error! Pass a userID to create fake data');
  process.exit(1);
}

const main = async () => {
  // Inserting Kite Trades
  const formattedKiteTrades = await formatKiteTrades(kiteTrades, userId);
  bulkInsertTradesToPostgres(formattedKiteTrades, 'KITE', userId);

  // Inserting Upstox Trades
  const formattedUpstoxTrades = await formatUpstoxTrades(upstoxTrades, userId);
  bulkInsertTradesToPostgres(formattedUpstoxTrades, 'UPSTOX', userId);

  // Inserting Kite Orders
  const formattedKiteOrders = await formatKiteOrders(kiteOrders, userId);
  bulkInsertOrdersToPostgres(formattedKiteOrders, 'KITE', userId);

  const formattedUpstoxOrders = await formatUpstoxOrders(upstoxOrders, userId);
  bulkInsertOrdersToPostgres(formattedUpstoxOrders, 'UPSTOX', userId);
};

main();
