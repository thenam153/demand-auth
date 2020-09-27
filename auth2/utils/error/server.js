const OAuthError = require('./oauth')
const util = require('util')
const MESSAGE = require('../message').MESSAGE
function ServerError(message, properties) {
    properties = Object.assign(properties, {
        code: 500,
        name: MESSAGE.SERVER
    })
    
    OAuthError.call(this, message, properties)
}

util.inherits(ServerError, Error)

module.exports = ServerError
module.exports.name = NAME.SERVER