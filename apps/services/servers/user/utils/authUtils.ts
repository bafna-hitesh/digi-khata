import { createHash } from 'crypto';
import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import redisClient from '../loaders/redis'; // Ensure correct import path
import User from '../models/User';
import BrokerAccount from '../models/Broker';
import config from '../config';
import produceDataToKafka from '../loaders/kafka';

// Securely generate a random token
// const generateToken = () => randomBytes(32).toString('hex');

// Hash the token for secure storage
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

// Generate JWT
const generateJWT = (userId: string, expiresIn: string) => {
  const payload = { userId };
  return jwt.sign(payload, config.APP_SECRET, { expiresIn });
};

// Function to retrieve active broker tokens for a user
const getActiveBrokerTokens = async (userId: string) => {
  const user = await User.findByPk(userId);
  const activeBrokerTokens = await BrokerAccount.getActiveBrokerTokens(user?.get('id') as string);
  return activeBrokerTokens;
};

const setAuthenticationToken = async (res: Response, userId: string) => {
  // Generate JWT access and refresh tokens
  const accessToken = generateJWT(userId, '1h'); // Access token valid for 1 hour
  const refreshToken = generateJWT(userId, '7d'); // Refresh token valid for 7 days

  // Hash the tokens for secure storage
  const hashedAccessToken = hashToken(accessToken);
  const hashedRefreshToken = hashToken(refreshToken);

  // Retrieve active broker tokens
  const brokerTokens = await getActiveBrokerTokens(userId);

  // Structured user data for storage
  const userData = { userId, brokerTokens };

  // Store the hashed token and associated data in Redis
  await redisClient.set(`accessToken:${hashedAccessToken}`, JSON.stringify(userData), 'EX', 3600); // Expires in 1 hour
  await redisClient.set(`refreshToken:${hashedRefreshToken}`, JSON.stringify(userData), 'EX', 604800); // Expires in 7 days

  // Set the plain tokens in the response cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  // Fire Event to notify order-ms to start syncing trades/orders in background
  const data = {
    tokens: brokerTokens,
  };
  produceDataToKafka('login', data, userId);
};

// Checks if the JWT is expired
const isJwtExpired = (token: string) => {
  try {
    jwt.verify(token, config.APP_SECRET as string);
    return false; // Token is valid
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return true; // Token has expired
    }
    throw error; // Other errors (token might be invalid)
  }
};

// Decode JWT after checking if it is expired or not
const decodeJWT = async (token: string) => {
  return jwt.decode(token);
};

// Function to handle expired access tokens
const handleExpiredAccessToken = async (refreshToken: string) => {
  if (isJwtExpired(refreshToken)) {
    // Refresh token is also expired, ask user to relogin
    return { shouldRelogin: true };
  }

  // Decode the refresh token and assert the correct type for the payload
  const decoded = jwt.decode(refreshToken) as JwtPayload;

  if (!decoded || typeof decoded === 'string' || !decoded.userId) {
    throw new Error('Invalid token payload');
  }

  // Generate a new access token using the userId from the refresh token
  const newAccessToken = generateJWT(decoded.userId, '1h');

  return { newAccessToken };
};

// Function to get userId from hashedAccessToken
const getUserIDFromRedis = async (hashedAccessToken: string) => {
  const userData = await redisClient.get(`accessToken:${hashedAccessToken}`);
  let userId;
  if (userData) {
    // If found userData in Redis, get the userId
    userId = JSON.parse(userData)?.userId;
  }
  return userId;
};

export {
  hashToken,
  setAuthenticationToken,
  getActiveBrokerTokens,
  isJwtExpired,
  handleExpiredAccessToken,
  getUserIDFromRedis,
  decodeJWT,
};
