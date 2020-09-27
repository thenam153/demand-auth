const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function UnAuthorizedClientError(message, properties) {
    properties = Object.assign(properties, {
        code: 400,
        name: MESSAGE.UNAUTHORIZED_CLIENT
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(UnAuthorizedClientError, Error)

module.exports = UnAuthorizedClientError