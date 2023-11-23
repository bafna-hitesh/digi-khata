import { Request, Response } from 'express';
import { zerodha } from '@digi/brokers';
import config from '../config';
import User from '../models/User';
import { generateJWT, generateRandomToken } from '../utils';

export const zerodhaInitialLogin = (req: Request, res: Response) => {
  const loginURL = zerodha.userAuth.getLoginUrl(config.KITE_API_KEY);
  res.redirect(loginURL);
};

export const zerodhaLogin = async (req: Request, res: Response) => {
  try {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const requestToken = zerodha.userAuth.getRequestToken(fullUrl);

    if (!requestToken) {
      throw new Error('Request Token not found in redirect URL');
    }

    const kiteUserProfile = await zerodha.userAuth.getUserProfileWithAccessToken({
      apiKey: config.KITE_API_KEY,
      apiSecret: config.KITE_API_SECRET,
      requestToken,
    });

    const users = await User.findAll({
      where: {
        kiteUserID: kiteUserProfile.user_id,
      },
    });

    let existingUser;

    if (users.length > 1) {
      throw new Error('Duplicate Profile Found');
    }

    // Saving the user to database if doesn't exist
    if (users.length === 0) {
      const formattedKiteProfile = zerodha.kiteUtils.formatKiteProfile(kiteUserProfile);
      existingUser = await User.create({
        name: kiteUserProfile.user_name,
        kiteUserID: kiteUserProfile.user_id,
        kiteUserDetails: formattedKiteProfile,
      });
    }

    if (users.length === 1) existingUser = users[0];

    const clientToken = generateRandomToken(20);

    // Updating Tokens
    if (existingUser) {
      await existingUser.update({
        clientToken,
        kiteAccessToken: kiteUserProfile.access_token,
      });
    }

    const jwtToken = generateJWT(clientToken, config.APP_SECRET);

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
    });
    return res.redirect(config.APP_HOME_URL);
  } catch (error) {
    console.log(`[Error] Some Exception occured${JSON.stringify(error)}`);
    return res.redirect(config.APP_LOGIN_URL);
  }
};
