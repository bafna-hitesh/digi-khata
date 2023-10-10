import { sequelize } from "../../loaders/sequelize";
import * as query from "./query";
import { QueryTypes } from "sequelize";


async function getKiteProfitDaily(startDate: any, endDate: any, user: string, broker: string, segment: string) {
  let kiteFOProfitDaily = await sequelize.query(query.getKiteProfitDaily, {
    replacements: {
      startDate: startDate,
      endDate: endDate,
      user: user,
      broker: broker,
      segment: segment
    },
    type: QueryTypes.SELECT
  });
  return kiteFOProfitDaily;
}

async function getKiteProfitByDayOfWeek(startDate: any, endDate: any, user: string, broker: string, segment: string) {
  let kiteFOProfitDaily = await sequelize.query(query.getKiteProfitByDayOfWeek, {
    replacements: {
      startDate: startDate,
      endDate: endDate,
      user: user,
      broker: broker,
      segment: segment
    },
    type: QueryTypes.SELECT
  });
  return kiteFOProfitDaily;
}

// async function getKiteFOProfitHourly(startDate: any, endDate: any, routerURL: string, user: string, broker: string, type: string) {
//   let parameters = [
//     { "type": "TIMESTAMP", "value": startDate },
//     { "type": "TIMESTAMP", "value": endDate.add(1, 'day').format('YYYY-MM-DD') }, // Incrementing Date since Druid doesn't include end Date
//     { "type": "VARCHAR", "value": user },
//     { "type": "VARCHAR", "value": broker },
//     { "type": "VARCHAR", "value": type },
//   ]
//   let kiteFOProfitHourly = await runQuery(routerURL, query.getKiteFOProfitHourly, parameters);
//   return kiteFOProfitHourly.data;
// }

export {
  getKiteProfitDaily,
  getKiteProfitByDayOfWeek,
  // getKiteFOProfitHourly
}
