require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');



app.use(express.json());
// routes
app.use('/qa', routes);

// loader.io verification
app.get('/loaderio-3c4545d756d21c40da88525235dd81c5.txt', routes)

app.get('/test', (req, res) => {
  res.send(`OK...${process.pid} responded`)

})



module.exports = app