const statuses = require('statuses')
const util = require('util')

function OAuthError(message, properties = {}) {
    if (!properties.code) {
        properties.code = 500
    }
    if (!message) {
        message = statuses[properties.code] || 'Error'
    }
    this.message = message
    for (let key in properties) {
        this[key] = properties[key]
    }
    Error.captureStackTrace(this, OAuthError)
}

util.inherits(OAuthError, Error)

module.exports = OAuthError
module.exports.name = NAME.OAUTH