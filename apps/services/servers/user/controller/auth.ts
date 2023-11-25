import { Request, Response } from 'express';
import { zerodha } from '@digi/brokers';
import config from '../config';
import User from '../models/User';
import BrokerAccount from '../models/Broker';
import { setAuthenticationToken } from '../utils/authUtils';

const { extractRequestToken, getUserProfileWithAccessToken } = zerodha.userAuth;

const fetchUserProfile = async (requestToken: string) => {
  return getUserProfileWithAccessToken({
    apiKey: config.KITE_API_KEY,
    apiSecret: config.KITE_API_SECRET,
    requestToken,
  });
};

const findOrCreateUser = (kiteUserProfile: zerodha.IKiteUserProfile) =>
  User.findOrCreateUser({
    username: kiteUserProfile?.user_id,
    email: kiteUserProfile?.email,
    firstName: kiteUserProfile?.user_name?.split(' ')[0],
    lastName: kiteUserProfile?.user_name?.split(' ').slice(1).join(' '),
    profilePicture: kiteUserProfile?.avatar_url,
  });

/**
 * @swagger
 * /auth/login/zerodha:
 *   get:
 *     summary: Initiates the Zerodha login process.
 *     description: Redirects the user to the Zerodha login page to start the authentication process.
 *     responses:
 *       302:
 *         description: Redirect to the Zerodha login URL.
 */
export const zerodhaInitialLogin = (req: Request, res: Response) => {
  try {
    const loginURL = zerodha.userAuth.getLoginUrl(config.KITE_API_KEY);
    res.redirect(loginURL);
  } catch (error) {
    console.error(`[Error] Failed to generate Zerodha login URL: ${error}`);
    res.status(500).json({ error: 'Failed to initiate Zerodha login process.' });
  }
};

/**
 * @swagger
 * /callback/zerodha:
 *   get:
 *     summary: Callback endpoint for Zerodha login.
 *     description: Handles the callback from Zerodha after user authentication, and processes user data.
 *     parameters:
 *       - in: query
 *         name: requestToken
 *         required: true
 *         description: The request token received from Zerodha.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated and redirected to the application home URL.
 *       302:
 *         description: Redirect to the application login URL on failure.
 *       400:
 *         description: Bad request if request token is not found.
 *       500:
 *         description: Internal server error.
 */
export const zerodhaLogin = async (req: Request, res: Response) => {
  try {
    // Extract and validate request token
    const requestToken = extractRequestToken(req);
    if (!requestToken) {
      throw new Error('Request token not found in redirect URL.');
    }

    // Retrieve user profile from Zerodha
    const kiteUserProfile = await fetchUserProfile(requestToken);

    // Handle user and broker account processing
    const user = await findOrCreateUser(kiteUserProfile);

    // Create or find broker account
    const brokerProfile = {
      brokerUserProfile: kiteUserProfile,
      accessTokens: {
        accessToken: kiteUserProfile?.access_token,
        publicToken: kiteUserProfile?.public_token,
      },
      brokerName: 'ZERODHA',
    };
    await BrokerAccount.findOrCreateBroker(user, brokerProfile, 'ZERODHA');

    // Generate and set authentication token
    await setAuthenticationToken(res, user.id);

    // Redirect to home page
    res.redirect(config.APP_HOME_URL);
  } catch (error) {
    console.error(`[Error] Exception occurred: ${JSON.stringify(error)}`);
    res.redirect(config.APP_LOGIN_URL);
  }
};
