import crypto from 'crypto';
import { Request } from 'express';
import axios from './axiosInstance';
import { baseLoginURL } from './constants';
import IKiteUserProfile from './types/userTypes';

// generate login url to be redirected https://kite.trade/docs/connect/v3/user/#login-flow
const getLoginUrl = (apiKey: string, state?: string) => {
  const loginURL = new URL(baseLoginURL);
  loginURL.searchParams.append('v', '3');
  loginURL.searchParams.append('api_key', apiKey);

  // If state is passed, then append as query parameter
  if (state) {
    loginURL.searchParams.append('redirect_params', state);
  }
  return loginURL.toString();
};

// get request token from url
const getRequestToken = (url: string) => new URL(url)?.searchParams?.get('request_token');

// get user profile https://kite.trade/docs/connect/v3/user/#login-flow
const getUserProfileWithAccessToken = async ({
  apiKey,
  apiSecret,
  requestToken,
}: {
  apiKey: string;
  apiSecret: string;
  requestToken: string;
}): Promise<IKiteUserProfile> => {
  const checksum = crypto
    .createHash('sha256')
    .update(apiKey + requestToken + apiSecret)
    .digest('hex');

  const sessionResponse = await axios.post(
    '/session/token',
    new URLSearchParams({
      api_key: apiKey,
      request_token: requestToken,
      checksum,
    }),
  );
  return sessionResponse.data.data;
};

// Get Opening Balance - https://kite.trade/docs/connect/v3/user/#funds-and-margins
const getOpeningBalance = async (apiKey: string, accessToken: string) => {
  const balanceResponse = await axios.get('/user/margins', {
    headers: { Authorization: `token ${apiKey}:${accessToken}` },
  });
  return balanceResponse.data;
};

const extractRequestToken = (req: Request) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  return getRequestToken(fullUrl);
};

export { getLoginUrl, getRequestToken, getUserProfileWithAccessToken, getOpeningBalance, extractRequestToken };
