const PrettyError = require('pretty-error')
const environment = require('./node-env')
const pe = new PrettyError()

function prettyError(error, request, response, next) {
  if (environment === 'development') {
    console.log(pe.render(error))
  }

  next(error)
}

module.exports = prettyError
