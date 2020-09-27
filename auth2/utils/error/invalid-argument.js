const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function InvalidArgumentError(message, properties) {
    properties = Object.assign(properties, {
        code: 401,
        name: MESSAGE.INVALID_ARGUMENT
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(InvalidArgumentError, Error)

module.exports = InvalidArgumentError
module.exports.name = NAME.INVALID_ARGUMENT