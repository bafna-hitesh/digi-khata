import { getKiteProfitDaily, getKiteProfitByDayOfWeek } from './daily';

async function getKiteDataDaily(
  user: string,
  broker: string,
  segment: string,
  startDate: any,
  endDate: any,
) {

  let kiteProfitDaily: any = await getKiteProfitDaily(startDate, endDate, user, broker, segment);

  let totalTrades: number = 0;
  let dailyWins = 0;
  let dailyLoses = 0;
  let winRate;

  for(let currentDayData of kiteProfitDaily) {
    totalTrades += (currentDayData.totalTrades);
    currentDayData.profit >= 0 ? dailyWins++ : dailyLoses++;
  }
  
  winRate = dailyWins / (dailyWins + dailyLoses) * 100;
  
  return {
    dailyData: kiteProfitDaily,
    totalTrades,
    dailyWins,
    dailyLoses,
    winRate
  }
}

async function getKiteDataByDayOfWeek(
  user: string,
  broker: string,
  segment: string,
  startDate: any,
  endDate: any) {

  let kiteProfitByDayOfWeek = await getKiteProfitByDayOfWeek(startDate, endDate, user, broker, segment);

  return { profitByDayOfWeek : kiteProfitByDayOfWeek };
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

export {
  getKiteDataDaily,
  getKiteDataByDayOfWeek,
  // getKiteFODataByHourly
}
