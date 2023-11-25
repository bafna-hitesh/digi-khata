import { randomBytes, createHash } from 'crypto';
import { Response } from 'express';
import redisClient from '../loaders/redis'; // Ensure correct import path
import User from '../models/User';
import BrokerAccount from '../models/Broker';

// Define a type for the token pair
type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

// Securely generate a random token
const generateToken = () => randomBytes(32).toString('hex');

// Hash the token for secure storage
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

// Function to retrieve active broker tokens for a user
const getActiveBrokerTokens = async (userId: string) => {
  const user = await User.findByPk(userId);
  const activeBrokerTokens = await BrokerAccount.getActiveBrokerTokens(user?.get('id') as string);
  return activeBrokerTokens;
};

const setAuthenticationToken = async (res: Response, userId: string) => {
  const tokenSet: Set<TokenPair> = new Set();
  while (tokenSet.size < 10) {
    // Generate 10 pairs of tokens
    tokenSet.add({ accessToken: generateToken(), refreshToken: generateToken() });
  }

  const tokenChecks = Array.from(tokenSet).map(({ accessToken, refreshToken }: TokenPair) => {
    const hashedAccessToken = hashToken(accessToken);
    const hashedRefreshToken = hashToken(refreshToken);
    return Promise.all([
      redisClient.get(`accessToken:${hashedAccessToken}`),
      redisClient.get(`refreshToken:${hashedRefreshToken}`),
    ]);
  });

  const existingTokens = await Promise.all(tokenChecks);
  let selectedTokens: TokenPair | undefined;

  for (let i = 0; i < existingTokens.length; i += 1) {
    if (!existingTokens[i][0] && !existingTokens[i][1]) {
      // Neither token exists in Redis
      selectedTokens = Array.from(tokenSet)[i];
      break;
    }
  }

  if (!selectedTokens) {
    throw new Error('Could not generate unique tokens after multiple attempts.');
  }

  const { accessToken, refreshToken } = selectedTokens;
  const hashedAccessToken = hashToken(accessToken);
  const hashedRefreshToken = hashToken(refreshToken);

  // Retrieve active broker tokens
  const brokerTokens = await getActiveBrokerTokens(userId);

  // Structured user data for storage
  const userData = { userId, brokerTokens };

  // Store the hashed token and associated data in Redis
  await redisClient.set(`accessToken:${hashedAccessToken}`, JSON.stringify(userData), 'EX', 3600); // Expires in 1 hour
  await redisClient.set(`refreshToken:${hashedRefreshToken}`, JSON.stringify(userData), 'EX', 86400); // Expires in 1 day

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
};

export { setAuthenticationToken, getActiveBrokerTokens };
