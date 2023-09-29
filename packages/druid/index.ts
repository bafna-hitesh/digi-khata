import { getKiteFOProfitDaily, getKiteFOProfitByDayOfWeek, getKiteFOProfitHourly } from './daily';
import dayjs from 'dayjs';

async function getKiteFODataDaily(
  routerURL: string,
  user: string,
  broker: string,
  type: string,
  freq: string,
  startDate: any,
  endDate: any,
) {
  
  // Converting to dayjs object to make date calculations easier
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);

  let kiteFOProfitDaily = await getKiteFOProfitDaily(startDate, endDate, routerURL, user, broker, type);

  let totalTrades = 0;
  let dailyWins = 0;
  let dailyLoses = 0;
  let winRate;

  for(let currentDayData of kiteFOProfitDaily) {
    totalTrades += currentDayData.totalTrades;
    currentDayData.profit >= 0 ? dailyWins++ : dailyLoses++;
  }
  
  winRate = dailyWins / (dailyWins + dailyLoses) * 100;
  
  return {
    dailyData: kiteFOProfitDaily,
    totalTrades,
    dailyWins,
    dailyLoses,
    winRate
  }
}

async function getKiteFODataByDayOfWeek(
  routerURL: string,
  user: string,
  broker: string,
  type: string,
  freq: string,
  startDate: any,
  endDate: any) {
  
    // Converting to dayjs object to make date calculations easier
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);

  let kiteFOProfitByDayOfWeek = await getKiteFOProfitByDayOfWeek(startDate, endDate, routerURL, user, broker, type);

  return { profitByDayOfWeek : kiteFOProfitByDayOfWeek };
}

async function getKiteFODataByHourly(
  routerURL: string,
  user: string,
  broker: string,
  type: string,
  freq: string,
  startDate: any,
  endDate: any) {
  
  // Converting to dayjs object to make date calculations easier
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);

  let kiteFOProfitHourly = await getKiteFOProfitHourly(startDate, endDate, routerURL, user, broker, type);

  return { hourlyData : kiteFOProfitHourly };
}

export {
  getKiteFODataDaily,
  getKiteFODataByDayOfWeek,
  getKiteFODataByHourly
}
