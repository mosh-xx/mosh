const jwt = require('express-jwt')

function getToken({ headers: { authorization }, query }) {
  const [type, token] = (authorization || '').split(/\s+/)
  return type === 'Bearer' && token || query.token
}

module.exports = { jwt, getToken }
