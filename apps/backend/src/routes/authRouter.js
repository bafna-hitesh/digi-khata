import express from 'express';
import { config } from 'dotenv';
import { userAuth } from '@digi/zerodha';

const authRouter = express.Router();
config();

authRouter.get('/auth/login/zerodha', (req, res) => {
    const loginURL = userAuth.getLoginURLForZerodha(process.env.KITE_API_KEY, process.env.KITE_LOGIN_URL);
    res.redirect(loginURL);
});

export default authRouter;