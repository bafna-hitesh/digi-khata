import Redis from 'ioredis';
import config from '../config';

// Configure Redis client
const redisClient = new Redis({
  host: config.REDIS_HOST, // or the appropriate hostname
  port: config.REDIS_PORT, // default port; change if your Redis server uses a different port
});

// Verify the connection
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisClient;
