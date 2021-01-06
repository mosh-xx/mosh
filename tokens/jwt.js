const { sign } = require('jsonwebtoken')

class AuthToken {
  constructor(...args) {
    this.configure(...args)
  }

  configure({ secretKey }) {
    this.secretKey = secretKey
  }

  sign(payload, options) {
    return sign(payload, this.secretKey, options)
  }
}

const secretKey = process.env.JWT_SECRET_KEY ||
                  process.env.SECRET_KEY_BASE

module.exports = new AuthToken({ secretKey })
