/*
Pool vs Client
Use a pool if expecting multiple concurrent requests.
That is literally what it is there for:
to provide a pool of re-usable open client instances
 */
const Pool = require('pg').Pool;
require('dotenv').config()

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.PG_PORT,
  //database: process.env.INITIAL_DB_NAME,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // max: 40,
  // default is 100
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})


pool.connect(async (err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  await client.query(`SELECT pid FROM pg_stat_activity where usename = '${process.env.DB_USERNAME}'`, (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(`Connected to DB ${pool.options.database} as ${pool.options.user} via ${pool.options.host}:${pool.options.port} on PID:${result.rows[0].pid}.`)

  })
})

module.exports = pool;