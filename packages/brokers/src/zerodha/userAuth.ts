import crypto from "crypto";
import axios from "./axiosInstance";
import { baseURL } from "./constants";

// generate login url to be redirected https://kite.trade/docs/connect/v3/user/#login-flow
const getLoginUrl = (apiKey: string) =>
  `${baseURL}/connect/login?v=3&api_key=${apiKey}`;

// get request token from url
const getRequestToken = (url: string) =>
  new URL(url)?.searchParams?.get("request_token");

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
    .createHash("sha256")
    .update(apiKey + requestToken + apiSecret)
    .digest("hex");

  let sessionResponse = await axios.post(
    '/session/token',
    new URLSearchParams({
      'api_key': apiKey,
      'request_token': requestToken,
      'checksum': checksum
    }),
  );
  return sessionResponse.data.data;
};

export {
  getLoginUrl,
  getRequestToken,
  getUserProfileWithAccessToken
}