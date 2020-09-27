const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function UnSupportedGrantTypeError(message, properties) {
    properties = Object.assign(properties, {
        code: 400,
        name: MESSAGE.UNSUPPORTED_GRANT_TYPE
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(UnSupportedGrantTypeError, Error)

module.exports = UnSupportedGrantTypeError