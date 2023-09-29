import runQuery from "./runQuery";
import * as query from "./query";


async function getKiteFOProfitDaily(startDate: any, endDate: any, routerURL: string, user: string, broker: string, type: string) {
  let parameters = [
    { "type": "TIMESTAMP", "value": startDate },
    { "type": "TIMESTAMP", "value": endDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
  ]
  let kiteFOProfitDaily = await runQuery(routerURL, query.getKiteFOProfitDaily, parameters);
  return kiteFOProfitDaily.data;
}

async function getKiteFOProfitByDayOfWeek(startDate: any, endDate: any, routerURL: string, user: string, broker: string, type: string) {
  let parameters = [
    { "type": "TIMESTAMP", "value": startDate },
    { "type": "TIMESTAMP", "value": endDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
  ]
  let kiteFOProfitByDayOfWeek = await runQuery(routerURL, query.getKiteFOProfitByDayOfWeek, parameters);
  return kiteFOProfitByDayOfWeek.data;
}

async function getKiteFOProfitHourly(startDate: any, endDate: any, routerURL: string, user: string, broker: string, type: string) {
  let parameters = [
    { "type": "TIMESTAMP", "value": startDate },
    { "type": "TIMESTAMP", "value": endDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
    { "type": "VARCHAR", "value": user },
    { "type": "VARCHAR", "value": broker },
    { "type": "VARCHAR", "value": type },
  ]
  let kiteFOProfitHourly = await runQuery(routerURL, query.getKiteFOProfitHourly, parameters);
  return kiteFOProfitHourly.data;
}

export {
  getKiteFOProfitDaily,
  getKiteFOProfitByDayOfWeek,
  getKiteFOProfitHourly
}
