import { Request } from 'express';
import { baseLoginURL } from './constants';
import axios from './axiosInstance';

// Generate Login URL - https://upstox.com/developer/api-documentation/authentication#perform-authentication
const getLoginUrl = (apiKey: string, redirectURL: string, state?: string) => {
  const loginURL = new URL(baseLoginURL);
  loginURL.searchParams.append('response_type', 'code');
  loginURL.searchParams.append('client_id', apiKey);
  loginURL.searchParams.append('redirect_uri', redirectURL);
  // If state is passed, then append as query parameter
  if (state) {
    loginURL.searchParams.append('state', state);
  }
  return loginURL.toString();
};

const extractCodeAndState = (req: Request) => {
  const callbackURL = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  return {
    code: callbackURL.searchParams.get('code'),
    state: callbackURL.searchParams.get('state'),
  };
};

const extractCode = (req: Request) => {
  const callbackURL = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  return {
    code: callbackURL.searchParams.get('code'),
  };
};

// https://upstox.com/developer/api-documentation/get-token
const generateAccessToken = async (code: string, apiKey: string, apiSecret: string, redirectURL: string) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = new URLSearchParams({
    code,
    client_id: apiKey,
    client_secret: apiSecret,
    redirect_uri: redirectURL,
    grant_type: 'authorization_code',
  });

  const accessTokenResponse = await axios.post('/login/authorization/token', data, { headers });
  return accessTokenResponse.data.access_token;
};

// https://upstox.com/developer/api-documentation/get-profile
const getUserProfileWithAccessToken = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const userProfileResponse = await axios.get('/user/profile', { headers });
  return userProfileResponse.data.data;
};

export { getLoginUrl, extractCodeAndState, extractCode, generateAccessToken, getUserProfileWithAccessToken };
