import { NextFunction, Request, Response } from 'express';
import * as druid from '@digi/druid';
// import config from '../config';
import testData from '../../../test/constants';

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  // try {
    // Todo - Validate Input
    // let body = req.body;
    let calendarData: any = await druid.getKiteFODataDaily(testData.routerURL, testData.user, testData.broker, testData.commodity, testData.freq, testData.startDate, testData.endDate);
    let dataByDayOfWeek: any = await druid.getKiteFODataByDayOfWeek(testData.routerURL, testData.user, testData.broker, testData.commodity, testData.freq, testData.startDate, testData.endDate);
    let hourlyData: any = await druid.getKiteFODataByHourly(testData.routerURL, testData.user, testData.broker, testData.commodity, testData.freq, testData.startDate, testData.endDate);
    
    return res.json({
      "calendar": calendarData,
      "performanceByDayOfTheWeek": dataByDayOfWeek,
      "timeAnalysis": hourlyData
    });
  // } catch(err) {
  // console.log('Some Exception Occurred');
  // console.error(err);
  // }
};
