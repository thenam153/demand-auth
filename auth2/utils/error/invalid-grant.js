const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function InvalidGrantError(message, properties) {
    properties = Object.assign(properties, {
        code: 400,
        name: MESSAGE.INVALID_GRANT
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(InvalidGrantError, Error)

module.exports = InvalidGrantError