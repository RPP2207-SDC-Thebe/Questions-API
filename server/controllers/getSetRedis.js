// Redis
const redisClient = require('../db/redis.js')
const DEFAULT_EXPIRATION = 3600

module.exports = {
  getOrSetCache: (key, cb) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key)
        .then(async (data) => {
          // if cache data exists
          if (data !== null) {
            //console.log('cache hit')
            return resolve([200, JSON.parse(data)])
            //*add retrun here to stop the execution earlier */
          }
          // no cache, need fresh data
          // console.log('cache miss')
          const freshData = await cb()
          redisClient.set(key, JSON.stringify(freshData))
          //redisClient.expire(key, DEFAULT_EXPIRATION)
          resolve([200, freshData])
        })
        .catch((err) => {
          return reject([500, err])
        })
    })
  }
}