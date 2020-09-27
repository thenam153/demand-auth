const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function InvalidClientError(message, properties) {
    properties = Object.assign(properties, {
        code: 401,
        name: MESSAGE.INVALID_CLIENT
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(InvalidClientError, Error)

module.exports = InvalidClientError