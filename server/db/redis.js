require('dotenv').config()
const redis = require('redis');
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT || 6379
const redisClient = redis.createClient({
  // socket: {
  //   port: REDIS_PORT,
  //   host: REDIS_HOST,
  // }
});

redisClient.connect();


redisClient.on('error', err => console.error('Redis Client Error', err))




module.exports = redisClient;