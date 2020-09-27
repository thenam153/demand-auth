const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function InvalidRequestError(message, properties) {
    properties = Object.assign(properties, {
        code: 400,
        name: MESSAGE.INVALID_REQUEST
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(InvalidRequestError, Error)

module.exports = InvalidRequestError
module.exports.name = NAME.INVALID_REQUEST