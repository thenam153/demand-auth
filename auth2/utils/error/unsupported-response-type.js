const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function UnSupportedResponseTypeError(message, properties) {
    properties = Object.assign(properties, {
        code: 400,
        name: MESSAGE.UNSUPPORTED_RESPONSE_TYPE
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(UnSupportedResponseTypeError, Error)

module.exports = UnSupportedResponseTypeError