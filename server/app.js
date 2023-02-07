require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080
const routes = require('./routes');


app.use(express.json());
// routes
app.use('/qa', routes);

app.get('/test', (req, res) => {
  res.status(200).send('OK')
})

module.exports = app