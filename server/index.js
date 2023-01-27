require('dotenv').config();
const port = process.env.PORT || 8080
const app = require('./app.js')

//avoid port collision
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`)
  });
}