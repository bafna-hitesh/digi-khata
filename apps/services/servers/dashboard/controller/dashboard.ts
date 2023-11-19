import { Request, Response } from 'express';
import testData from '../../../test/constants';
import {
  getKiteDataByDayOfWeek,
  getKiteDataDaily,
  getKiteDataHourly,
  getKiteOpeningBalanceDataDaily,
  getKiteTradeDistributionByMistakes,
  getKiteTradePerformanceByMistakes,
  getKiteTradePerformanceByStrategy,
} from '../lib/postgres';

export const getDashboardData = async (req: Request, res: Response) => {
  // try {

  // Todo - Validate Input
  // let body = req.body;
  const calendarData: any = await getKiteDataDaily(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  const dataByDayOfWeek: any = await getKiteDataByDayOfWeek(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  // Todo - Fix hour time, sequelize is currently returning null but the query works fine in postgres
  const hourlyData: any = await getKiteDataHourly(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  const tradeDistributionByMistakes: any = await getKiteTradeDistributionByMistakes(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  // Todo - Fix models to get this data
  const kiteOpeningBalanceDaily: any = await getKiteOpeningBalanceDataDaily(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  const tradePerformanceByMistakes: any = await getKiteTradePerformanceByMistakes(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  const tradePerformanceByStrategy: any = await getKiteTradePerformanceByStrategy(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  return res.json({
    calendar: calendarData,
    performanceByDayOfTheWeek: dataByDayOfWeek,
    timeAnalysis: hourlyData,
    tradeDistributionByMistakes,
    openingBalance: kiteOpeningBalanceDaily,
    tradePerformanceByMistakes,
    tradePerformanceByStrategy,
  });
  // } catch(err) {
  // console.log('Some Exception Occurred');
  // console.error(err);
  // }
};

export default getDashboardData;
