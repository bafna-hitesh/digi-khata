// export const getKiteAllData = "SELECT * FROM orders WHERE __time BETWEEN ? AND ? AND user = ? AND broker = ? AND segment = ?";

// export const getKiteFOBuyForTheDay = "SELECT symbol, COUNT(symbol) AS trades, SUM(quantity * price) AS expense FROM (SELECT * FROM orders WHERE __time BETWEEN ? AND ?) WHERE trade_type = 'buy' AND user = ? AND broker = ? AND segment = ? GROUP BY symbol";

// export const getKiteFOSellForTheDay = "SELECT symbol, COUNT(symbol) AS trades, SUM(quantity * price) AS revenue FROM (SELECT * FROM orders WHERE __time BETWEEN ? AND ?) WHERE trade_type = 'sell' AND user = ? AND broker = ? AND segment = ? GROUP BY symbol";

// export const getKiteFOBuyForDayOfTheWeek = "SELECT symbol, SUM(quantity * price) AS expense FROM (SELECT * FROM orders WHERE __time BETWEEN ? AND ?) WHERE trade_type = 'buy' AND user = ? AND broker = ? AND segment = ? AND TIME_EXTRACT(__time, 'DOW') = ? GROUP BY symbol";

// export const getKiteFOSellForDayOfTheWeek = "SELECT symbol, SUM(quantity * price) AS revenue FROM (SELECT * FROM orders WHERE __time BETWEEN ? AND ?) WHERE trade_type = 'sell' AND user = ? AND broker = ? AND segment = ? AND TIME_EXTRACT(__time, 'DOW') = ? GROUP BY symbol";

export const getKiteFOProfitDaily = `SELECT 
  trade_date AS "date", 
  SUM(CASE WHEN trade_type = 'buy' THEN -("quantity" * "price") ELSE ("quantity" * "price") END) AS profit, 
  COUNT(*) as totalTrades
FROM orders
WHERE
  __time BETWEEN ? AND ? AND user = ? AND broker = ? AND segment = ? 
GROUP BY
  trade_date
ORDER BY
  trade_date`;

export const getKiteFOProfitByDayOfWeek = `SELECT
  CASE
    WHEN TIME_EXTRACT(__time, 'DOW') = 0 THEN 'Sunday'
    WHEN TIME_EXTRACT(__time, 'DOW') = 1 THEN 'Monday'
    WHEN TIME_EXTRACT(__time, 'DOW') = 2 THEN 'Tuesday'
    WHEN TIME_EXTRACT(__time, 'DOW') = 3 THEN 'Wednesday'
    WHEN TIME_EXTRACT(__time, 'DOW') = 4 THEN 'Thursday'
    WHEN TIME_EXTRACT(__time, 'DOW') = 5 THEN 'Friday'
    WHEN TIME_EXTRACT(__time, 'DOW') = 6 THEN 'Saturday'
  END AS dayOfWeek,
  SUM(CASE WHEN trade_type = 'buy' THEN -("quantity" * "price") ELSE ("quantity" * "price") END) AS profit
FROM orders
WHERE
  __time BETWEEN ? AND ? AND user = ? AND broker = ? AND segment = ?
GROUP BY
  TIME_EXTRACT(__time, 'DOW')
ORDER BY
  TIME_EXTRACT(__time, 'DOW')`;

export const getKiteFOProfitHourly = `SELECT
  CASE
    WHEN TIME_EXTRACT(__time, 'HOUR') = 9 THEN '9-10'
    WHEN TIME_EXTRACT(__time, 'HOUR') = 10 THEN '10-11'
    WHEN TIME_EXTRACT(__time, 'HOUR') = 11 THEN '11-12'
    WHEN TIME_EXTRACT(__time, 'HOUR') = 12 THEN '12-13'
    WHEN TIME_EXTRACT(__time, 'HOUR') = 13 THEN '13-14'
    WHEN TIME_EXTRACT(__time, 'HOUR') = 14 THEN '14-15'
    WHEN TIME_EXTRACT(__time, 'HOUR') = 15 THEN '15-16'
  END AS "hour",
  SUM(CASE WHEN trade_type = 'buy' THEN -("quantity" * "price") ELSE ("quantity" * "price") END) AS profit, 
  COUNT(*) as totalTrades
FROM orders
WHERE
  __time BETWEEN ? AND ? AND user = ? AND broker = ? AND segment = ?
GROUP BY
  TIME_EXTRACT(__time, 'HOUR')
ORDER BY
  TIME_EXTRACT(__time, 'HOUR')`;
