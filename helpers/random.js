const random = require('crypto-random-string')

class SecureRandom {
  alphanumeric(length) {
    return random({ length, type: 'alphanumeric' })
  }

  numeric(length) {
    return random({ length, type: 'numeric' })
  }

  urlSafe(length) {
    return random({ length, type: 'url-safe' })
  }

  base64(length) {
    return random({ length, type: 'base64' })
  }

  hex(length) {
    return random({ length, type: 'hex' })
  }
}

module.exports = new SecureRandom()
