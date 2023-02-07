require('dotenv').config();
const port = process.env.PORT || 8080
const app = require('./app.js')
const baseURL = process.env.BASE_URL

//avoid port collision
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`app listening on ${baseURL}${port}`)
  });
}