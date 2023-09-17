import runQuery from "./runQuery";
import * as query from "./query";

async function getKiteFOBuyForTheDay(currentDate: any, routerURL: string, user: string, broker: string, type: string) {
  let parameters = [
    { "type": "TIMESTAMP", "value": currentDate },
    { "type": "TIMESTAMP", "value": currentDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
  ]
  let kiteFOBuyData = await runQuery(routerURL, query.getKiteFOBuyForTheDay, parameters);
  return kiteFOBuyData.data;
}

async function getKiteFOSellForTheDay(currentDate: any, routerURL: string, user: string, broker: string, type: string) {
  let parameters = [
    { "type": "TIMESTAMP", "value": currentDate },
    { "type": "TIMESTAMP", "value": currentDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
  ]
  let kiteFOSellData = await runQuery(routerURL, query.getKiteFOSellForTheDay, parameters);
  return kiteFOSellData.data;
}

async function getKiteFOBuyForWeekDay(weekDay: any, startDate: any, endDate: any, routerURL: string, user: string, broker: string, type: string) {
  let parameters = [
    { "type": "TIMESTAMP", "value": startDate },
    { "type": "TIMESTAMP", "value": endDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
    { "type": "INTEGER", "value": weekDay }
  ]
  let kiteFOBuyData = await runQuery(routerURL, query.getKiteFOBuyForDayOfTheWeek, parameters);
  return kiteFOBuyData.data;
}

async function getKiteFOSellForWeekDay(weekDay: any, startDate: any, endDate: any, routerURL: string, user: string, broker: string, type: string) {
  let parameters = [
    { "type": "TIMESTAMP", "value": startDate },
    { "type": "TIMESTAMP", "value": endDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
    { "type": "INTEGER", "value": weekDay }
  ]
  let kiteFOBuyData = await runQuery(routerURL, query.getKiteFOSellForDayOfTheWeek, parameters);
  return kiteFOBuyData.data;
}

export {
  getKiteFOBuyForTheDay,
  getKiteFOSellForTheDay,
  getKiteFOBuyForWeekDay,
  getKiteFOSellForWeekDay
}
