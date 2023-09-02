import { NextFunction, Request, Response } from "express";
import * as druid from "@digi/druid";
import config from "../config";

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  let data = await druid.getAllData(config.DRUID_ROUTER_URL);
  return res.json(data.data);
}