require("dotenv").config();
const fs = require('fs');

module.exports = {
  getToken: (req, res) => {
    const token = __dirname + `/../..${process.env.LOADER_IO_URL}`
    try {
      const data = fs.readFileSync(token, 'utf8')
      console.log(data)
      res.send(data)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }

  }
}

