import express from 'express';
import { config } from 'dotenv';
import { zerodha } from '@digi/brokers';
import { generateRandomToken, generateJWT } from '../utils/index.js';
import User from '../models/User.js';

const { userAuth, kiteUtils } = zerodha;
const oauthRouter = express.Router();
config();

oauthRouter.get('/oauth/zerodha', async (req, res) => {
    try {
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let requestToken = userAuth?.getRequestToken(fullUrl);

        if(!requestToken) {
            throw new Error('Request Token not found in redirect URL');
        }

        let kiteUserProfile = await userAuth?.getUserProfileWithAccessToken(process.env.KITE_API_KEY, process.env.KITE_API_SECRET, requestToken, process.env.KITE_BASE_URL);

        let users = await User.findAll({
            where: {
                kiteUserID: kiteUserProfile.user_id
            }
        });

        let existingUser;
        
        // Saving the user to database if doesn't exist
        if(users.length === 0) {
            let formattedKiteProfile = kiteUtils?.formatKiteProfile(kiteUserProfile);
            existingUser = await User.create({
                name: kiteUserProfile.user_name,
                kiteUserID: kiteUserProfile.user_id,
                kiteUserDetails: formattedKiteProfile
            });
        }

        if(users.length > 1) {
            throw new Error('Duplicate Profile Found');
        }

        if(users.length === 1) 
            existingUser = users[0];

        let clientToken = generateRandomToken(20);

        // Updating Tokens
        await existingUser.update({
            clientToken: clientToken,
            kiteAccessToken: kiteUserProfile.access_token
        });

        let jwtToken = generateJWT(clientToken, process.env.APP_SECRET);

        res.cookie('token', jwtToken, {
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