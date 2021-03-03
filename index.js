const serveError = require('serve-handler/src/error')
const serveHandler = require('serve-handler')
const createExpress = require('express')
const statuses = require('statuses')
const dotenv = require('dotenv')
const environment = require('./node-env')
const knock = require('./knock')
const PORT = process.env.PORT || 4567

function errorHandler(error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    return response.status(401).json({
      message: statuses[401]
    })
  }

  response.status(500).send(serveError({
    message: statuses[500],
    statusCode: 500,
  }))
}

function noMatchHandler(request, response) {
  serveHandler(request, response, {
    public: 'public'
  })
}

class Mosh {
  constructor({ environment }) {
    this.environment = environment
    this.createApplication()
    dotenv.config()
  }

  createApplication() {
    this.application = createExpress()
  }

  prepare() {
    this.application.use(errorHandler)
    this.application.get('*', noMatchHandler)
  }

  use(...args) {
    this.application.use(...args)
  }

  jwt(...args) {
    this.application.use(knock.jwt(...args))
  }

  start() {
    this.application.listen(PORT, () => {
      console.log(`* Listening on http://localhost:${PORT}`)
      console.log('* Use Ctrl-C to stop')
    })
  }
}

module.exports = new Mosh({ environment })
