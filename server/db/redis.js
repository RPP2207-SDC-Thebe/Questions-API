const redis = require('redis');
require('dotenv').config()
const REDIS_PORT = process.env.REDIS_PORT || 6379
const redisClient = redis.createClient(REDIS_PORT);

redisClient.connect();


redisClient.on('error', err => console.error('Redis Client Error', err))




module.exports = redisClient;