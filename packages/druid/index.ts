// import runQuery from './runQuery';
// import * as query from './query';
import { getKiteFOProfitDaily, getKiteFOProfitByDayOfWeek, getKiteFOProfitHourly } from './daily';
import dayjs from 'dayjs';

// function getAllData(
//   routerURL: string,
//   user: string,
//   broker: string,
//   type: string,
//   freq: string,
//   startDate: any,
//   endDate: any,
// ) {
//   let parameters = [
//     { type: 'TIMESTAMP', value: startDate },
//     { type: 'TIMESTAMP', value: endDate },
//     { type: 'VARCHAR', value: user },
//     { type: 'VARCHAR', value: broker },
//     { type: 'VARCHAR', value: type },
//   ];
//   return runQuery(routerURL, query.getKiteAllData, parameters);
// }

async function getKiteFODataDaily(
  routerURL: string,
  user: string,
  broker: string,
  type: string,
  freq: string,
  startDate: any,
  endDate: any,
) {
  
  // Making startDate and endDate as dayjs Object to make Date calculations easier
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

async function getKiteFODataByDayOfWeek(routerURL: string, user: string, broker: string, type: string, freq: string, startDate: any, endDate: any) {
  // Converting to dayjs object
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);

  let kiteFOProfitByDayOfWeek = await getKiteFOProfitByDayOfWeek(startDate, endDate, routerURL, user, broker, type);

  return { profitByDayOfWeek : kiteFOProfitByDayOfWeek };
}

async function getKiteFODataByHourly(routerURL: string, user: string, broker: string, type: string, freq: string, startDate: any, endDate: any) {
  // Converting to dayjs object
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);

  let kiteFOProfitHourly = await getKiteFOProfitHourly(startDate, endDate, routerURL, user, broker, type);

  return { hourlyData : kiteFOProfitHourly };
}

// function getAllData(routerURL: string, user: string, broker: string, type: string, freq: string, startDate: any, endDate: any) {
//   let parameters = [
//     { "type": "TIMESTAMP", "value": startDate},
//     { "type": "TIMESTAMP", "value": endDate },
//     { "type": "VARCHAR", "value": user },
//     { "type": "VARCHAR", "value": broker },
//     { "type": "VARCHAR", "value": type },
//   ]
//   return runQuery(routerURL, query.getKiteAllData, parameters);
// }

// async function getKiteDailyFOData(routerURL: string, user: string, broker: string, type: string, freq: string, startDate: any, endDate: any) {
//   let totalTrades = 0;
//   let totalProfitableTrades = 0;
//   let dailyData: any = [];
  
//   // Making startDate and endDate as dayjs Object to make Date calculations easier
//   startDate = dayjs(startDate);
//   endDate = dayjs(endDate);
//   let currentDate = startDate;

//   while(currentDate <=  endDate) {
//     let totalBuyForTheDay: any = await getKiteFOBuyForTheDay(currentDate, routerURL, user, broker, type);
//     let totalSellForTheDay: any = await getKiteFOSellForTheDay(currentDate, routerURL, user, broker, type);
//     let noOfTradesForTheDay = 0;
//     let profitForTheDay = 0;

//     if(totalBuyForTheDay.length !== totalSellForTheDay.length) {
//       throw new Error('Inconsistent Data');
//     }

//     for(let i = 0; i < totalBuyForTheDay.length; i++) {
//       let revenue = totalSellForTheDay[i].revenue;
//       let expense = totalBuyForTheDay[i].expense;
//       profitForTheDay += revenue - expense;
//       totalProfitableTrades = profitForTheDay > 0 ? totalProfitableTrades + 1 : totalProfitableTrades;
//     }
    
//     noOfTradesForTheDay = totalBuyForTheDay.length;
//     totalTrades += noOfTradesForTheDay;

//     dailyData.push({
//       "date": currentDate.format('YYYY-MM-DD'),
//       "noOfTrades": noOfTradesForTheDay,
//       "profit": profitForTheDay
//     });

//     currentDate = currentDate.add(1, 'day');
//   }

//   let totalLossTrades = totalTrades - totalProfitableTrades;
//   let winRate = totalProfitableTrades / totalTrades * 100;

//   return {
//     "dailyData": dailyData,
//     "totalTrades": totalTrades,
//     "profitableTrades": totalProfitableTrades,
//     "lossTrades": totalLossTrades,
//     "winRate": winRate
//   };
// }

// async function getKiteFODataByDayOfWeek(routerURL: string, user: string, broker: string, type: string, freq: string, startDate: any, endDate: any) {
//   let dataByDayOfWeek: any = [];

//   startDate = dayjs(startDate);
//   endDate = dayjs(endDate);

//   // Calculate profit for each week day in given time period. Druid treats each week day as number. Ex - 1 for Monday, 2 for Tuesday and so on
//   for(let weekDay = 1; weekDay <= 7; weekDay++) {
//     let totalBuyForWeekDay: any = await getKiteFOBuyForWeekDay(weekDay, startDate, endDate, routerURL, user, broker, type);
//     let totalSellForWeekDay: any = await getKiteFOSellForWeekDay(weekDay, startDate, endDate, routerURL, user, broker, type);
//     let profitForWeekDay = 0;

//     if(totalBuyForWeekDay.length !== totalSellForWeekDay.length) {
//       throw new Error('Inconsistent Data');
//     }

//     for(let i = 0; i < totalBuyForWeekDay.length; i++) {
//       let revenue = totalSellForWeekDay[i].revenue;
//       let expense = totalBuyForWeekDay[i].expense;
//       profitForWeekDay += revenue - expense;
//     }

//     dataByDayOfWeek.push({
//       "day": getWeekDay(weekDay),
//       "profit": profitForWeekDay
//     });
//   }

//   return { "data": dataByDayOfWeek };
// }

// function getWeekDay(weekDay: number) {
//   if(weekDay === 1) return 'Monday';
//   if(weekDay === 2) return 'Tuesday';
//   if(weekDay === 3) return 'Wednesday';
//   if(weekDay === 4) return 'Thursday';
//   if(weekDay === 5) return 'Friday';
//   if(weekDay === 6) return 'Saturday';
//   if(weekDay === 7) return 'Sunday';
// }


export {
  // getAllData,
  getKiteFODataDaily,
  getKiteFODataByDayOfWeek,
  getKiteFODataByHourly
}
