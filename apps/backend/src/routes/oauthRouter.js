import express from 'express';
import { config } from 'dotenv';
import { userAuth } from '@digi/zerodha';

const oauthRouter = express.Router();
config();

oauthRouter.get('/oauth/zerodha', async (req, res) => {
    try {
        let requestToken = userAuth.getRequestToken(req.url);

        if(!requestToken) {
            throw new Error('Request Token not found in redirect URL');
        }

        let accessToken = await userAuth.getAccessToken(process.env.KITE_API_KEY, process.env.KITE_API_SECRET, requestToken, process.env.KITE_BASE_URL);

        res.cookies('accessToken', accessToken, {
            httpOnly: true,
            secure: true
        });
        return res.redirect(process.env.APP_HOME_URL);

    } catch(error) {
        console.log('[Error] Some Exception occured' + JSON.stringify(error));
        return res.redirect(process.env.APP_LOGIN_URL);
    }
});

export default oauthRouter;