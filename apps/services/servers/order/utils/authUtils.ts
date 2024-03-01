import redisClient from '../loaders/redis';

// Function to get userId from hashedAccessToken
const getUserDataFromRedis = async (hashedAccessToken: string) => {
  const redisResponse = await redisClient.get(`accessToken:${hashedAccessToken}`);
  let userData;
  if (redisResponse) {
    // If found userData in Redis, get the userId
    userData = JSON.parse(redisResponse);
  }
  // return userData;
  return userData;
};

export default getUserDataFromRedis;
