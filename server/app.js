require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const redisClient = require('../server/db/redis.js')



app.use(express.json());
// routes
app.use('/qa', routes);

// loader.io verification
app.get(`${process.env.LOADER_IO_URL}`, routes)

app.get('/test', (req, res) => {
  res.send(`OK...${process.pid} responded`)

})

app.get('/redis', async (req, res) => {
  const testdata = `gg ${new Date()}`
  await redisClient.set('testkey', JSON.stringify(testdata))
  let result = await redisClient.get('testkey')
  console.log(result)
  res.send(result)

})



module.exports = app