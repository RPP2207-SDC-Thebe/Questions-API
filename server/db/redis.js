const redis = require('redis');
require('dotenv').config()

const REDIS_PORT = process.env.REDIS_PORT || 6379
const redisClient = redis.createClient(REDIS_PORT);

redisClient.connect();

// redisClient.on('connect', function () {
//   console.log('Redis is Connected!');
// });

redisClient.on('error', err => console.error('Redis Client Error', err))

// redisClient.on('end', () => {
//   console.log('Redis disconnected');
// });
// redisClient.on('reconnecting', () => {
//   console.log('Redis reconnecting');
// });



module.exports = redisClient;