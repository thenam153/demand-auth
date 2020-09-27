const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function InvalidScopeError(message, properties) {
    properties = Object.assign(properties, {
        code: 400,
        name: MESSAGE.INVALID_SCOPE
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(InvalidScopeError, Error)

module.exports = InvalidScopeError
module.exports.name = NAME.INVALID_SCOPE