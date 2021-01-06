const branca = require('branca')
const random = require('../helpers/random')

class SecureToken {
  constructor(...args) {
    this.configure(...args)
  }

  configure({ secretKey }) {
    this.branca = branca(secretKey)
  }

  decode(...args) { return this.branca.decode(...args) }
  encode(...args) { return this.branca.encode(...args) }
}

const secretKey = process.env.BRANCA_SECRET_KEY ||
                  process.env.SECRET_KEY_BASE ||
                  random.hex(32)

module.exports = new SecureToken({ secretKey })
