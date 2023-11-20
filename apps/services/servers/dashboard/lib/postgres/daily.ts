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

async function getKiteProfitHourly(startDate: any, endDate: any, user: string, broker: string, segment: string) {
  const kiteFOProfitHourly = await sequelize.query(query.getKiteProfitHourly, {
    replacements: {
      startDate,
      endDate,
      user,
      broker,
      segment,
    },
    type: QueryTypes.SELECT,
  });
  return kiteFOProfitHourly;
}

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

async function getKiteOpeningBalanceDaily(startDate: string, endDate: string, user: string, broker: string) {
  const kiteOpeningBalanceDaily = await Balance.findAll({
    attributes: ['balanceDate', 'equityOpeningBalance', 'commodityOpeningBalance'],
    where: {
      balanceDate: {
        [Op.between]: [startDate, endDate],
      },
      userName: user,
      broker,
    },
    raw: true,
  });
  return kiteOpeningBalanceDaily;
}

export {
  getKiteProfitDaily,
  getKiteProfitByDayOfWeek,
  getKiteProfitHourly,
  getKiteTradeDistributionByMistakesData,
  getKiteOpeningBalanceDaily,
};
