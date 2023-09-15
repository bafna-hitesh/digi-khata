export const getKiteAllData =
  'SELECT * FROM orders WHERE __time BETWEEN ? AND ? AND user = ? AND broker = ? AND segment = ?';

export const getKiteFOBuyForTheDay =
  "SELECT symbol, COUNT(symbol), SUM(quantity * price) AS expense FROM (SELECT * FROM orders WHERE __time BETWEEN ? AND ?) WHERE trade_type = 'buy' AND user = ? AND broker = ? AND segment = ? GROUP BY symbol";

export const getKiteFOSellForTheDay =
  "SELECT symbol, COUNT(symbol), SUM(quantity * price) AS revenue FROM (SELECT * FROM orders WHERE __time BETWEEN ? AND ?) WHERE trade_type = 'sell' AND user = ? AND broker = ? AND segment = ? GROUP BY symbol";
