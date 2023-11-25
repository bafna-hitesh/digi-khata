import Redis from 'ioredis';

// Configure Redis client
const redisClient = new Redis({
  host: 'localhost', // or the appropriate hostname
  port: 6379, // default port; change if your Redis server uses a different port
});

// Verify the connection
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisClient;
