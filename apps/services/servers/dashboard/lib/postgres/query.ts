export const getKiteProfitDaily = `SELECT 
  "tradeDate", 
  SUM(CASE WHEN "transactionType" = 'BUY' THEN -(quantity * price) ELSE (quantity * price) END) AS "profit", 
  COUNT(*) as "totalTrades"
FROM trades
WHERE
  "tradeDate" BETWEEN :startDate AND :endDate AND "name" = :user AND "broker" = :broker AND "segment" = :segment 
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
  "tradeDate" BETWEEN :startDate AND :endDate AND "name" = :user AND "broker" = :broker AND "segment" = :segment 
GROUP BY
  EXTRACT(DOW FROM "tradeDate")
ORDER BY
  EXTRACT(DOW FROM "tradeDate")`;

export const getKiteProfitHourly = `SELECT
  CASE
    WHEN EXTRACT(HOUR FROM "orderTimestamp") = 9 THEN '9-10'
    WHEN EXTRACT(HOUR FROM "orderTimestamp") = 10 THEN '10-11'
    WHEN EXTRACT(HOUR FROM "orderTimestamp") = 11 THEN '11-12'
    WHEN EXTRACT(HOUR FROM "orderTimestamp") = 12 THEN '12-13'
    WHEN EXTRACT(HOUR FROM "orderTimestamp") = 13 THEN '13-14'
    WHEN EXTRACT(HOUR FROM "orderTimestamp") = 14 THEN '14-15'
    WHEN EXTRACT(HOUR FROM "orderTimestamp") = 15 THEN '15-16'
  END AS "hour",
  SUM (CASE WHEN "transactionType" = 'BUY' THEN -("quantity" * "price") ELSE ("quantity" * "price") END) AS "profit",
  COUNT(*) as "totalTrades"
FROM trades
WHERE
  "tradeDate" BETWEEN :startDate AND :endDate AND "name" = :user AND "broker" = :broker AND "segment" = :segment
GROUP BY
  EXTRACT(HOUR FROM "orderTimestamp")
ORDER BY
  EXTRACT(HOUR FROM "orderTimestamp")`;

export const getKiteTradePerformanceByMistakes = `
WITH TradeDetails AS (
  SELECT
      t."id",
      t."transactionType",
      t."quantity",
      t."price",
      CASE
          WHEN t."transactionType" = 'SELL' THEN (t."price" - (SELECT AVG("price") FROM "trades" WHERE "transactionType" = 'BUY' AND name = :user AND symbol = t.symbol AND broker = :broker AND segment = :segment AND "tradeDate" BETWEEN :startDate AND :endDate )) * t.quantity
          ELSE 0
      END AS pnl
  FROM
      trades t
),
MistakeImpact AS (
  SELECT
      m.tag AS "MistakeTag",
      SUM(CASE WHEN td.pnl > 0 THEN td.pnl ELSE 0 END) AS "TotalProfit",
      SUM(CASE WHEN td.pnl < 0 THEN -td.pnl ELSE 0 END) AS "TotalLoss"
  FROM
      TradeDetails td
  INNER JOIN
      trade_mistake tm ON td.id = tm."TradeId"
  INNER JOIN
      mistakes m ON tm."MistakeId" = m.id
  GROUP BY
      m.tag
)
SELECT
  "MistakeTag",
  "TotalProfit",
  "TotalLoss",
  RANK() OVER (ORDER BY "TotalLoss" DESC, "TotalProfit" DESC) as "MistakeRank"
FROM
  MistakeImpact
`;

export const getKiteTradePerformanceByStrategy = `
WITH TradeDetails AS (
  SELECT
      t."id",
      t."transactionType",
      t."quantity",
      t."price",
      CASE
          WHEN t."transactionType" = 'SELL' THEN (t."price" - (SELECT AVG("price") FROM "trades" WHERE "transactionType" = 'BUY' AND name = :user AND symbol = t.symbol AND broker = :broker AND segment = :segment AND "tradeDate" BETWEEN :startDate AND :endDate )) * t.quantity
          ELSE 0
      END AS pnl
  FROM
      trades t
),
MistakeImpact AS (
  SELECT
      s.tag AS "MistakeTag",
      SUM(CASE WHEN td.pnl > 0 THEN td.pnl ELSE 0 END) AS "TotalProfit",
      SUM(CASE WHEN td.pnl < 0 THEN -td.pnl ELSE 0 END) AS "TotalLoss"
  FROM
      TradeDetails td
  INNER JOIN
      trade_strategy ts ON td.id = ts."TradeId"
  INNER JOIN
      strategies s ON ts."StrategyId" = s.id
  GROUP BY
      s.tag
)
SELECT
  "MistakeTag",
  "TotalProfit",
  "TotalLoss",
  RANK() OVER (ORDER BY "TotalLoss" DESC, "TotalProfit" DESC) as "MistakeRank"
FROM
  MistakeImpact
`;
