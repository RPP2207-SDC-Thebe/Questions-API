const fs = require('fs');

module.exports = {
  getToken: (req, res) => {
    const token = __dirname + '/../../loaderio-3c4545d756d21c40da88525235dd81c5.txt'
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

