import { NextFunction, Request, Response } from 'express';
import testData from '../../../test/constants';
import { getKiteDataByDayOfWeek, getKiteDataDaily } from '../lib/postgres';

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  // try {
    
    // Todo - Validate Input
    // let body = req.body;
    let calendarData: any = await getKiteDataDaily(testData.user, testData.broker, testData.segment, testData.startDate, testData.endDate);
    
    let dataByDayOfWeek: any = await getKiteDataByDayOfWeek(testData.user, testData.broker, testData.segment, testData.startDate, testData.endDate);
    
    // Todo - Get Hourly Data after fixing orderTimestamp not showing in postgres database
    // let hourlyData: any = await druid.getKiteFODataByHourly(testData.routerURL, testData.user, testData.broker, testData.commodity, testData.freq, testData.startDate, testData.endDate);

    return res.json({
      "calendar": calendarData,
      "performanceByDayOfTheWeek": dataByDayOfWeek,
      // "timeAnalysis": hourlyData
    });
  // } catch(err) {
  // console.log('Some Exception Occurred');
  // console.error(err);
  // }
};
