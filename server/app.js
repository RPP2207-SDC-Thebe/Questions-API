require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080
const routes = require('./routes');
const cluster = require('cluster')

app.use(express.json());
// routes
app.use('/qa', routes);

app.get('/test', (req, res) => {
  res.send(`OK...${process.pid} responded`)

})

module.exports = app