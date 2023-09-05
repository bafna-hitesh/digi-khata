import { NextFunction, Request, Response } from "express";
import * as druid from "@digi/druid";
import config from "../config";

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body = req.body;
    let data = await druid.getAllData(config.DRUID_ROUTER_URL, 'Some Kite User', body.broker, body.commodity, body.freq, '2023-07-06', '2023-07-10');
    return res.json(data.data);
  } catch(err) {
    console.log('Some Exception Occurred');
    console.error(err);
  }
}