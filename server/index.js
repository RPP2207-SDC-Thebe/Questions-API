require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080
const routes = require('./routes');


app.use(express.json());
// routes
app.use('/qa', routes);

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
});

app.get('/test', (req, res) => {
  res.send('GT4')
})

module.exports = app