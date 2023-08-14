import express from 'express';
import { config } from 'dotenv';
import User from '../models/User.js';
import { zerodha } from '@digi/brokers';

const { kiteOrders } = zerodha;

const kiteRouter = express.Router();
config();

kiteRouter.get('/kite/orders', async (req, res) => {
    try {
        let userData = await User.findOne({
            where: {
                kiteUserID: 'JX7559'
            }
        });
    
        let accessToken = userData.kiteAccessToken;
    
        let ordersResponse = await kiteOrders?.getAllOrdersForTheDay(process.env.KITE_API_KEY, accessToken, process.env.KITE_BASE_URL);
    
        return res.status(200).json({
            message: 'Successfully got orders',
            orders: ordersResponse.data.data
        });
    } catch(err) {
        console.error('Some exception occurred - ', JSON.stringify(err));
        return res.status(500).json({
            message: 'Some Exception Occurred',
            err: JSON.stringify(err)
        })
    }
});

kiteRouter.get('/kite/refreshToken', (req, res) => {
    res.redirect(process.env.APP_LOGIN_URL);
});

export default kiteRouter;