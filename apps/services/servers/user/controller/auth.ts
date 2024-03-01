import { Request, Response } from 'express';
import { zerodha, upstox } from '@digi/brokers';
import config from '../config';
import User from '../models/User';
import BrokerAccount from '../models/Broker';
import { getUserIDFromRedis, hashToken, setAuthenticationToken } from '../utils/authUtils';

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

/**
 * @swagger
 * /broker/connect:
 *  get:
 *    summary: Connect Broker Endpoint
 *    description: Handles the connect broker functionality
 *    parameters:
 *      - in: path
 *        name: broker
 *        required: true
 *        description: Broker name to connect
 *        schema:
 *          type: string
 *    responses:
 *      302:
 *        description: Redirect for Broker Login
 *      400:
 *        description: Invalid Broker Name
 *      500:
 *        description: Internal Server Error
 */
export const connectBrokerController = (req: Request, res: Response) => {
  try {
    const broker = req?.params?.broker;

    // Get accessToken to pass as state to determine the existing user
    const { accessToken } = req.cookies;
    const hashedAccessToken = hashToken(accessToken);

    // Generate URL
    let loginURL;

    if (broker === 'zerodha') {
      loginURL = zerodha.userAuth.getLoginUrl(config.KITE_API_KEY, hashedAccessToken);
    } else if (broker === 'upstox') {
      loginURL = upstox.userAuth.getLoginUrl(config.UPSTOX_API_KEY, config.UPSTOX_REDIRECT_URL, hashedAccessToken);
    } else {
      throw new Error('[Connect-Broker] Invalid Broker Name Passed');
    }

    // Redirect to login
    res.redirect(loginURL);
  } catch (err) {
    console.log(`Exception occurred: ${JSON.stringify(err)}`);
    res.redirect(config.APP_HOME_URL);
  }
};

/**
 * @swagger
 * /auth/login/upstox:
 *   get:
 *     summary: Initiates the Upstox login process.
 *     description: Redirects the user to the Upstox login page to start the authentication process.
 *     responses:
 *       302:
 *         description: Redirect to the Upstox login URL.
 */
export const upstoxInitialLogin = (req: Request, res: Response) => {
  try {
    const upstoxLoginURL = upstox.userAuth.getLoginUrl(config.UPSTOX_API_KEY, config.UPSTOX_REDIRECT_URL);
    res.redirect(upstoxLoginURL);
  } catch (err) {
    console.error('[Error] Failed to generate upstox login URL ', err);
    res.status(500).json({ message: 'Failed to intiate upstox login process' });
  }
};

/**
 * @swagger
 * /callback/upstox:
 *   get:
 *     summary: Callback endpoint for Upstox login.
 *     description: Handles the callback from Upstox after user authentication, and processes user data.
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: One Time Code received from Upstox.
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
export const upstoxLogin = async (req: Request, res: Response) => {
  try {
    // Extract Code from Callback URL
    const { code } = upstox.userAuth.extractCode(req);

    // If no code was found, then its an invalid state for login
    if (!code) {
      return res.status(500).json({
        message: '[UPSTOX] Code missing from callback URL',
      });
    }

    // Generate Access Token
    const accessToken = await upstox.userAuth.generateAccessToken(
      code,
      config.UPSTOX_API_KEY,
      config.UPSTOX_API_SECRET,
      config.UPSTOX_REDIRECT_URL,
    );

    // Fetch User Profile from Upstox
    const upstoxUserProfile = await upstox.userAuth.getUserProfileWithAccessToken(accessToken);

    // Handle User Account Processing
    const user = await User.findOrCreateUser({
      username: upstoxUserProfile?.user_id,
      email: upstoxUserProfile?.email,
      firstName: upstoxUserProfile?.user_name?.split(' ')[0],
      lastName: upstoxUserProfile?.user_name?.split(' ').slice(1).join(' '),
    });

    // Handle Broker Processing
    const upstoxBrokerProfile = {
      brokerUserProfile: upstoxUserProfile,
      accessTokens: {
        accessToken: upstoxUserProfile.access_token,
      },
    };
    await BrokerAccount.findOrCreateBroker(user, upstoxBrokerProfile, 'UPSTOX');

    // Set Access Token
    await setAuthenticationToken(res, user.id);

    // Redirect to Home Page
    res.redirect(config.APP_HOME_URL);
  } catch (err) {
    console.error(`[Error] Exception occurred: ${JSON.stringify(err)}`);
    res.redirect(config.APP_LOGIN_URL);
  }
};

/**
 * @swagger
 * /callback/upstox/connect:
 *  get:
 *    summary: Callback endpoint for Upstox login when connecting a broker
 *    description: Handles the callback after the upstox login is complete. Used when connecting a broker
 *    parameters:
 *      - in: query
 *        name: code
 *        required: true
 *        description: One Time Code received from Upstox
 *        schema: string
 *      - in: query
 *        name: state
 *        required: true
 *        description: State variable that was passed when generated login URL for Upstox
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: When login was successful and redirected to Dashboard
 *      302:
 *        description: Redirect to the application login URL on failure.
 *      400:
 *        description: Bad Request when code or state variable is not found
 *      500:
 *        description: Internal Server Error
 */
export const upstoxBrokerConnectLogin = async (req: Request, res: Response) => {
  try {
    // Extract Code and State from Callback URL
    const { code, state } = upstox.userAuth.extractCodeAndState(req);

    // If no code was found, then its an invalid state for login
    if (!code) {
      return res.status(500).json({
        message: '[Upstox-CONNECT] Code missing from callback URL',
      });
    }

    // If no state was found, then something went wrong and this is an invalid state
    if (!state) {
      return res.status(500).json({
        message: '[Upstox-Connect] State missing from callback URL',
      });
    }

    // Generate Access Token
    const accessToken = await upstox.userAuth.generateAccessToken(
      code,
      config.UPSTOX_API_KEY,
      config.UPSTOX_API_SECRET,
      config.UPSTOX_REDIRECT_URL,
    );

    // Fetch User Profile from Upstox
    const upstoxUserProfile = await upstox.userAuth.getUserProfileWithAccessToken(accessToken);

    // Get UserID from state which is cached access token in redis
    const userId: string | null = await getUserIDFromRedis(state);
    if (!userId) {
      // Couldn't find user from accessToken
      throw new Error('[Upstox-Connect] Unable to find userId from state');
    }

    // Get full user details
    // Todo: Fix the any type
    const user: any = await User.findByPk(userId);

    if (!user) {
      throw new Error('[Upstox-Connect] Unable to find user from userId');
    }

    // Handle Broker Processing
    const upstoxBrokerProfile = {
      brokerUserProfile: upstoxUserProfile,
      accessTokens: {
        accessToken: upstoxUserProfile.access_token,
      },
    };
    await BrokerAccount.findOrCreateBroker(user, upstoxBrokerProfile, 'UPSTOX');

    // Set Access Token
    await setAuthenticationToken(res, user?.get('id') as string);

    // Redirect to Home Page
    res.redirect(config.APP_HOME_URL);
  } catch (err) {
    console.error(`[Error] Exception occurred: ${JSON.stringify(err)}`);
    res.redirect(config.APP_LOGIN_URL);
  }
};
