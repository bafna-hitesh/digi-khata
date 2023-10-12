export const getKiteProfitDaily = `SELECT 
  "tradeDate", 
  SUM(CASE WHEN "transactionType" = 'BUY' THEN -(quantity * price) ELSE (quantity * price) END) AS "profit", 
  COUNT(*) as "totalTrades"
FROM trades
WHERE
  "tradeDate" BETWEEN :startDate AND :endDate AND "user" = :user AND "broker" = :broker AND "segment" = :segment 
GROUP BY
  "tradeDate"
ORDER BY
  "tradeDate"`;

export const getKiteProfitByDayOfWeek = `SELECT
  CASE
    WHEN EXTRACT(DOW FROM "tradeDate") = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM "tradeDate") = 1 THEN 'Monday'
    WHEN EXTRACT(DOW FROM "tradeDate") = 2 THEN 'Tuesday'
    WHEN EXTRACT(DOW FROM "tradeDate") = 3 THEN 'Wednesday'
    WHEN EXTRACT(DOW FROM "tradeDate") = 4 THEN 'Thursday'
    WHEN EXTRACT(DOW FROM "tradeDate") = 5 THEN 'Friday'
    WHEN EXTRACT(DOW FROM "tradeDate") = 6 THEN 'Saturday'
  END AS "dayOfWeek",
  SUM(CASE WHEN "transactionType" = 'BUY' THEN -("quantity" * "price") ELSE ("quantity" * "price") END) AS "profit"
FROM trades
WHERE
  "tradeDate" BETWEEN :startDate AND :endDate AND "user" = :user AND "broker" = :broker AND "segment" = :segment 
GROUP BY
  EXTRACT(DOW FROM "tradeDate")
ORDER BY
  EXTRACT(DOW FROM "tradeDate")`;

export const getKiteProfitHourly = `SELECT
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