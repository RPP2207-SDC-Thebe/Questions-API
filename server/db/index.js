/*
Pool vs Client
Use a pool if expecting multiple concurrent requests.
That is literally what it is there for:
to provide a pool of re-usable open client instances
 */
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.PG_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  max: 40,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.connect()
  .then(() => {
    console.log('connected to DB.')
  })
  .catch((err) => { console.log('error connecting DB: ', err) })

module.exports = pool;