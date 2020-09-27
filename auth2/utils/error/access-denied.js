const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
const NAME = require('../message').NAME 

function AccessDeniedError(message, properties) {
    properties = Object.assign(properties, {
        code: 403,
        name: MESSAGE.ACCESS_DENIED
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(AccessDeniedError, Error)

module.exports = AccessDeniedError
module.exports.name = NAME.ACCESS_DENIED