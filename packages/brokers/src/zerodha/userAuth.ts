import crypto from 'crypto';
import axios from './axiosInstance';
import { loginURL } from './constants';

// generate login url to be redirected https://kite.trade/docs/connect/v3/user/#login-flow
const getLoginUrl = (apiKey: string) => `${loginURL}/?v=3&api_key=${apiKey}`;

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
}) => {
  const checksum = crypto
    .createHash('sha256')
    .update(apiKey + requestToken + apiSecret)
    .digest('hex');

  let sessionResponse = await axios.post(
    '/session/token',
    new URLSearchParams({
      api_key: apiKey,
      request_token: requestToken,
      checksum: checksum,
    }),
  );
  return sessionResponse.data.data;
};

// Get Opening Balance - https://kite.trade/docs/connect/v3/user/#funds-and-margins
const getOpeningBalance = async ({
  apiKey, 
  accessToken 
} : {
  apiKey: string;
  accessToken: string
}) => {
  let balanceResponse = await axios.get('/user/margins', { headers: {'Authorization: token ' : apiKey + accessToken } });
  return balanceResponse.data.data.available.opening_balance;
}

export { getLoginUrl, getRequestToken, getUserProfileWithAccessToken, getOpeningBalance };
