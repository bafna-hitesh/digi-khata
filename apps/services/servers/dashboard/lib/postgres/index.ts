import {
  getKiteProfitDaily,
  getKiteProfitByDayOfWeek,
  getKiteOpeningBalanceDaily,
  getKiteTradeDistributionByMistakesData,
} from './daily';
import { compareMistakesByCount } from '../../../../utils';

async function getKiteDataDaily(user: string, broker: string, segment: string, startDate: string, endDate: string) {
  const kiteProfitDaily: any = await getKiteProfitDaily(startDate, endDate, user, broker, segment);

  let totalTrades: number = 0;
  let dailyWins = 0;
  let dailyLoses = 0;

  for (const currentDayData of kiteProfitDaily) {
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

async function getKiteTradeDistributionByMistakes(
  user: string,
  broker: string,
  segment: string,
  startDate: string,
  endDate: string,
) {
  const kiteTradeDistributionByMistakes = await getKiteTradeDistributionByMistakesData(
    startDate,
    endDate,
    user,
    broker,
    segment,
  );

  // Converting Trade[] to JSON by removing sequelize metadata
  // Doing this way because Typescript is not recognising the get({plain: true}) function on the model which converts directly the model instance to JSON
  const kiteTradeDistributionByMistakesString = JSON.stringify(kiteTradeDistributionByMistakes);
  const kiteTradeDistributionByMistakesJSON = JSON.parse(kiteTradeDistributionByMistakesString);
  const tradeDistributionByMistakes: any = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const trade of kiteTradeDistributionByMistakesJSON) {
    const { tag } = trade.Mistakes;
    // Storing it as HashMap
    if (tradeDistributionByMistakes[tag]) {
      tradeDistributionByMistakes[tag] += 1;
    } else {
      tradeDistributionByMistakes[tag] = 1;
    }
  }

  // Pushing each tag and its count to array to sort it in desc order
  const tradeDistributionByMistakesArray = Object.keys(tradeDistributionByMistakes).map((mistake) => {
    return {
      tag: mistake,
      count: tradeDistributionByMistakes[mistake],
    };
  });

  tradeDistributionByMistakesArray.sort(compareMistakesByCount);
  return tradeDistributionByMistakesArray;
}

export {
  getKiteDataDaily,
  getKiteDataByDayOfWeek,
  // getKiteFODataByHourly,
  // getKiteTradesByMistakes,
  getKiteOpeningBalanceDataDaily,
  getKiteTradeDistributionByMistakes,
};
