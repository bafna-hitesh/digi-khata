import { Request, Response } from 'express';
import testData from '../../../test/constants';
import {
  getKiteDataByDayOfWeek,
  getKiteDataDaily,
  getKiteOpeningBalanceDataDaily,
  getKiteTradeDistributionByMistakes,
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

  // Todo - Get Hourly Data after fixing orderTimestamp not showing in postgres database
  // let hourlyData: any = await druid.getKiteFODataByHourly(testData.routerURL, testData.user, testData.broker, testData.commodity, testData.freq, testData.startDate, testData.endDate);

  const tradeDistributionByMistakes: any = await getKiteTradeDistributionByMistakes(
    testData.user,
    testData.broker,
    testData.segment,
    testData.startDate,
    testData.endDate,
  );

  // Todo - Fix models to get this data
  // const kiteOpeningBalanceDaily: any = await getKiteOpeningBalanceDataDaily(
  //   testData.user,
  //   testData.broker,
  //   testData.segment,
  //   testData.startDate,
  //   testData.endDate,
  // );

  return res.json({
    calendar: calendarData,
    performanceByDayOfTheWeek: dataByDayOfWeek,
    // "timeAnalysis": hourlyData,
    tradeDistributionByMistakes,
    // openingBalance: kiteOpeningBalanceDaily,
  });
  // } catch(err) {
  // console.log('Some Exception Occurred');
  // console.error(err);
  // }
};

export default getDashboardData;
