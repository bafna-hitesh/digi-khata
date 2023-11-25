/* eslint-disable */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Response } from 'express';
import { getOpeningBalance } from '@digi/brokers/src/zerodha/userAuth';
import Balance from '../models/Balance';
import User from '../models/User';
import config from '../config';

const syncKiteBalanceForTheDay = async (req: any, res: Response) => {
  try {
    if (!req?.user?.clientToken || !req?.body?.broker) {
      return res.status(400).json({
        message: 'Invalid Input',
      });
    }
    const { clientToken }: { clientToken: string } = req.user;
    const { broker }: { broker: string } = req.body;

    const balanceDate = new Date();

    const activeUser = await User.findOne({
      where: { clientToken },
    });

    if (activeUser === null) {
      return res.status(400).json({
        message: 'Invalid User',
      });
    }
    const { kiteAccessToken } = activeUser.toJSON();
    const userID = activeUser.toJSON().id;
    const userName = activeUser.toJSON().name;

    // const kiteAccessToken = 'OIFlH0xxn9SYjU0HLJvWkWQsr7SnG5fga';
    // const userName = 'Some Kite User';
    // const userID = '550e8400-e29b-41d4-a716-446655440000';
    // const broker = 'Kite';
    // const balanceDate = new Date();
    // const balanceDate = new Date('2023-11-12');

    const openingBalance = await getOpeningBalance(config.KITE_API_KEY, kiteAccessToken);
    const equityOpeningBalance = openingBalance.data.equity.available.opening_balance;
    const commodityOpeningBalance = openingBalance.data.commodity.available.opening_balance;

    await Balance.create({ userName, userID, broker, balanceDate, equityOpeningBalance, commodityOpeningBalance });

    return res.status(200).json({
      message: `Successfully synced opening balance for date: ${balanceDate}`,
    });
  } catch (err) {
    // handleError
    console.log('Some error occurred while syncing the opening balance data', err);
    return res.status(500).json({
      message: `Error occurred while syncing the opening balance data`,
    });
  }
};

export default syncKiteBalanceForTheDay;
