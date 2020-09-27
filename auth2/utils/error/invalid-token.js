const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function InvalidTokenError(message, properties) {
    properties = Object.assign(properties, {
        code: 400,
        name: MESSAGE.INVALID_TOKEN
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(InvalidTokenError, Error)

module.exports = InvalidTokenError