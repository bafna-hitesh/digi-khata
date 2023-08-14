import express from 'express';
import { config } from 'dotenv';
import { zerodha } from '@digi/brokers';

const { userAuth } = zerodha;

const authRouter = express.Router();
config();

authRouter.get('/auth/login/zerodha', (req, res) => {
    const loginURL = userAuth.getLoginUrl(process.env.KITE_API_KEY);
    res.redirect(loginURL);
});

export default authRouter;