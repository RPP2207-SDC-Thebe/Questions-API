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
  database: process.env.DB_NAME,
  // user: 'saikitJK'
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  max: 40,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

// pool.connect()
//   .then(() => console.log(`connected to DB ${process.env.DB_NAME} as ${process.env.DB_USERNAME} via ${process.env.DB_HOST}:${process.env.PG_PORT}.`))
//   // .then(() => pool.qeury(`SELECT pid FROM pg_stat_activity where usename = "${process.env.DB_USERNAME}"`))
//   // .then((result) => console.log(result.rows))
//   .catch((err) => { console.log('error connecting DB: ', err) })

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query(`SELECT pid FROM pg_stat_activity where usename = '${process.env.DB_USERNAME}'`, (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(`Connected to DB ${process.env.DB_NAME} as ${process.env.DB_USERNAME} via ${process.env.DB_HOST}:${process.env.PG_PORT} on PID:${result.rows[0].pid}.`)

  })
})

module.exports = pool;