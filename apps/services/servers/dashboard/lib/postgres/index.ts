import { getKiteProfitDaily, getKiteProfitByDayOfWeek, getKiteOpeningBalanceDaily } from './daily';

async function getKiteDataDaily(user: string, broker: string, segment: string, startDate: string, endDate: string) {
  const kiteProfitDaily: any = await getKiteProfitDaily(startDate, endDate, user, broker, segment);

  let totalTrades: number = 0;
  let dailyWins = 0;
  let dailyLoses = 0;

  for(let currentDayData of kiteProfitDaily) {
    totalTrades += currentDayData.totalTrades;
    currentDayData.profit >= 0 ? dailyWins++ : dailyLoses++;
  }

  const winRate = (dailyWins / (dailyWins + dailyLoses)) * 100;

  return {
    dailyData: kiteProfitDaily,
    totalTrades,
    dailyWins,
    dailyLoses,
    winRate,
  };
}

async function getKiteDataByDayOfWeek(
  user: string,
  broker: string,
  segment: string,
  startDate: string,
  endDate: string,
) {
  const kiteProfitByDayOfWeek = await getKiteProfitByDayOfWeek(startDate, endDate, user, broker, segment);

  return { profitByDayOfWeek: kiteProfitByDayOfWeek };
}

// async function getKiteFODataByHourly(
//   routerURL: string,
//   user: string,
//   broker: string,
//   type: string,
//   freq: string,
//   startDate: any,
//   endDate: any) {

//   // Converting to dayjs object to make date calculations easier
//   startDate = dayjs(startDate);
//   endDate = dayjs(endDate);

//   let kiteFOProfitHourly = await getKiteFOProfitHourly(startDate, endDate, routerURL, user, broker, type);

//   return { hourlyData : kiteFOProfitHourly };
// }

// async function getKiteTradesByMistakes(
//   user: string,
//   broker: string,
//   segment: string,
//   startDate: string,
//   endDate: string,
// ) {
//   const kiteTradeDistributionByMistakes = await getKiteTradesByMistakes(startDate, endDate, user, broker, segment);

//   return { tradeDistributionByMistakes: kiteTradeDistributionByMistakes };
// }

async function getKiteOpeningBalanceDataDaily(
  user: string,
  broker: string,
  segment: string,
  startDate: string,
  endDate: string,
) {
  const kiteBalanceDailyQueryResponse = await getKiteOpeningBalanceDaily(startDate, endDate, user, broker);

  const kiteBalanceDaily = kiteBalanceDailyQueryResponse.map((row: any) => {
    if (segment === 'EQUITY') {
      return row.toJSON().equityOpeningBalance;
    }
    return row.toJSON().commodityOpeningBalance;
  });

  return { kiteBalanceDaily };
}

export {
  getKiteDataDaily,
  getKiteDataByDayOfWeek,
  // getKiteFODataByHourly,
  // getKiteTradesByMistakes,
  getKiteOpeningBalanceDataDaily,
};
