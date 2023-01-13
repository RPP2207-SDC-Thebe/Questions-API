require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080


app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
});

module.exports = app