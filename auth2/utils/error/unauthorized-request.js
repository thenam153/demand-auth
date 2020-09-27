const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function UnAuthorizedRequestError(message, properties) {
    properties = Object.assign(properties, {
        code: 401,
        name: MESSAGE.UNAUTHORIZED_REQUEST
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(UnAuthorizedRequestError, Error)

module.exports = UnAuthorizedRequestError
module.exports.name = NAME.UNAUTHORIZED_REQUEST