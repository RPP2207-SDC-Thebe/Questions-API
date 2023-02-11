require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');


app.use(express.json());
// routes
app.use('/qa', routes);

app.get('/test', (req, res) => {
  res.send(`OK...${process.pid} responded`)

})

module.exports = app