import { NextFunction, Request, Response } from 'express';
import * as druid from '@digi/druid';
import config from '../config';

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  // try {
    let body = req.body;
    let calendarData: any = await druid.getKiteDailyFOData(config.DRUID_ROUTER_URL, 'Some Kite User', 'Kite', 'FO', body.freq, '2023-07-06', '2023-07-07');
    let dataByDayOfWeek: any = await druid.getKiteFODataByDayOfWeek(config.DRUID_ROUTER_URL, 'Some Kite User', 'Kite', 'FO', body.freq, '2023-07-06', '2023-07-07');
    
    return res.json({
      "calendar": calendarData,
      "performanceByDayOfTheWeek": dataByDayOfWeek
    });
  // } catch(err) {
  // console.log('Some Exception Occurred');
  // console.error(err);
  // }
};
