import runQuery from "./runQuery";
import * as query from "./query";
import { DateTime } from 'luxon';

async function getKiteFOBuyForTheDay(currentDate: any, routerURL: string, user: string, broker: string, type: string) {
  currentDate = DateTime.fromISO(currentDate);
  let parameters = [
    { "type": "TIMESTAMP", "value": currentDate },
    { "type": "TIMESTAMP", "value": currentDate.plus({ days: 1 }).toISODate() },  // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
  ]
  let kiteFOBuyData = await runQuery(routerURL, query.getKiteFOBuyForTheDay, parameters);
  return kiteFOBuyData.data;
}

async function getKiteFOSellForTheDay(currentDate: any, routerURL: string, user: string, broker: string, type: string) {
  currentDate = DateTime.fromISO(currentDate);
  let parameters = [
    { "type": "TIMESTAMP", "value": currentDate },
    { "type": "TIMESTAMP", "value": currentDate.plus({ days: 1 }).toISODate() },  // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
  ]
  let kiteFOSellData = await runQuery(routerURL, query.getKiteFOSellForTheDay, parameters);
  return kiteFOSellData.data;
}

export {
  getKiteFOBuyForTheDay,
  getKiteFOSellForTheDay
}