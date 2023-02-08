
const cluster = require('cluster')
const os = require('os')
const numCpu = os.cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    // create new worker process
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} dismissed`)
    // after a worker process is gone, create another one, provide always up instances
    cluster.fork()
  })
} else {
  require('dotenv').config();
  const port = process.env.PORT || 8080
  const app = require('./app.js')

  //avoid port collision
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server $${process.pid} listening on http://localhost:${port}`)
    });
  }
}


