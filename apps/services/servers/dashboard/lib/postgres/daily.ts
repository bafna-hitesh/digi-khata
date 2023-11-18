import { Op, QueryTypes } from 'sequelize';
import { sequelize } from '../../loaders/sequelize';
import * as query from './query';
import Balance from '../../../user/models/Balance';
import Mistake from '../../../order/models/Mistake';
import Trade from '../../../order/models/Trade';

async function getKiteProfitDaily(startDate: any, endDate: any, user: string, broker: string, segment: string) {
  const kiteFOProfitDaily = await sequelize.query(query.getKiteProfitDaily, {
    replacements: {
      startDate,
      endDate,
      user,
      broker,
      segment,
    },
    type: QueryTypes.SELECT,
  });
  return kiteFOProfitDaily;
}

async function getKiteProfitByDayOfWeek(startDate: any, endDate: any, user: string, broker: string, segment: string) {
  const kiteFOProfitDaily = await sequelize.query(query.getKiteProfitByDayOfWeek, {
    replacements: {
      startDate,
      endDate,
      user,
      broker,
      segment,
    },
    type: QueryTypes.SELECT,
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

async function getKiteTradeDistributionByMistakesData(
  startDate: any,
  endDate: any,
  user: string,
  broker: string,
  segment: string,
) {
  const kiteTradeDistributionByMistakes = await Trade.findAll({
    attributes: ['id'],
    where: {
      name: user,
      broker,
      segment,
      tradeDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: Mistake,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt'],
        },
      },
    ],
    raw: true,
    nest: true,
    // plain: true,
  });
  return kiteTradeDistributionByMistakes;
}

async function getKiteOpeningBalanceDaily(startDate: string, endDate: string, userID: string, broker: string) {
  const kiteOpeningBalanceDaily = await Balance.findAll({
    where: {
      balanceDate: {
        [Op.between]: [startDate, endDate],
      },
      userID,
      broker,
    },
  });
  return kiteOpeningBalanceDaily;
}

export {
  getKiteProfitDaily,
  getKiteProfitByDayOfWeek,
  // getKiteFOProfitHourly,
  getKiteTradeDistributionByMistakesData,
  getKiteOpeningBalanceDaily,
};
