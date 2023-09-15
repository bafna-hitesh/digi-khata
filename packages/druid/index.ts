import runQuery from './runQuery';
import * as query from './query';
import { getKiteFOBuyForTheDay, getKiteFOSellForTheDay } from './daily';
import { DateTime } from 'luxon';

function getAllData(
  routerURL: string,
  user: string,
  broker: string,
  type: string,
  freq: string,
  startDate: any,
  endDate: any,
) {
  let parameters = [
    { type: 'TIMESTAMP', value: startDate },
    { type: 'TIMESTAMP', value: endDate },
    { type: 'VARCHAR', value: user },
    { type: 'VARCHAR', value: broker },
    { type: 'VARCHAR', value: type },
  ];
  return runQuery(routerURL, query.getKiteAllData, parameters);
}

async function getKiteDailyFOData(
  routerURL: string,
  user: string,
  broker: string,
  type: string,
  freq: string,
  startDate: any,
  endDate: any,
) {
  let totalTrades = 0;
  let totalProfitableTrades = 0;
  let totalProfit = 0;
  let dailyData: any = [];

  // Making startDate and endDate as DateTime Object to make Date calculations easier
  startDate = DateTime.fromISO(startDate);
  endDate = DateTime.fromISO(endDate);
  let currentDate = startDate;

  while (currentDate <= endDate) {
    let totalBuyForTheDay: any = await getKiteFOBuyForTheDay(currentDate, routerURL, user, broker, type);
    console.log('Total Buy for the day', totalBuyForTheDay);
    console.log(typeof totalBuyForTheDay);
    let totalSellForTheDay: any = await getKiteFOSellForTheDay(currentDate, routerURL, user, broker, type);
    console.log('Total Sell for the day: ', totalSellForTheDay);
    let noOfTradesForTheDay = 0;
    let profitForTheDay = 0;

    if (totalBuyForTheDay.length !== totalSellForTheDay.length) {
      throw new Error('Inconsistent Data');
    }

    for (let i = 0; i < totalBuyForTheDay.length; i++) {
      console.log('I: ', i);
      console.log('totalBuyForTheDay: ', totalBuyForTheDay[i].expense);
      console.log('totalSellForTheDay: ', totalSellForTheDay[i].revenue);
      console.log('typeof(totalBuyForTheDay', typeof totalBuyForTheDay[i].expense);
      console.log('typeof(totalSellForTheDay', typeof totalSellForTheDay[i].revenue);
      profitForTheDay = Number(totalSellForTheDay[i].revenue) - Number(totalBuyForTheDay[i].expenses);
      console.log('typeof(profitForTheDay): ', typeof profitForTheDay);
      console.log('profitForTheDay:', profitForTheDay);
      totalTrades++;
      console.log('totalTrades: ', totalTrades);
      totalProfitableTrades = profitForTheDay > 0 ? totalProfitableTrades++ : totalProfitableTrades;
      totalProfit += profitForTheDay;
      console.log('totalProfit: ', totalProfit);
      noOfTradesForTheDay++;
    }

    dailyData.push({
      date: currentDate.toISODate(),
      noOfTrades: noOfTradesForTheDay,
      profit: profitForTheDay,
    });

    currentDate = currentDate.plus({ days: 1 });
  }

  let totalLossTrades = totalTrades - totalProfitableTrades;
  let winRate = (totalProfitableTrades / totalTrades) * 100;

  return {
    type: 'calendar',
    dailyData: dailyData,
    totalTrades: totalTrades,
    profitableTrades: totalProfitableTrades,
    lossTrades: totalLossTrades,
    winRate: winRate,
  };
}

export { getAllData, getKiteDailyFOData };
