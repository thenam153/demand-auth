const error = require('../utils/error')

/**
 * Typical client schema:
 * _id:    { type: "object", required: true, unique: true },
 * name:   { type: "string", required: true },
 * secret: { type: "string", required: true },
 * uri:    { type: "string", required: false },
 * scope:  { type: "array", required: false,
 *     items: { type: "string", enum: ["possible", "scope", "values"] },
  * },
 * grants: { type: "array", required: false,
 *     items: { type: "string", enum: ["authorization_code", "implicit", "password", "client_credentials"] }
 * }
 */

module.exports.getId = function(client) {
    throw new error.serverError('Client model method "getId" is not implemented')
}

module.exports.getSecret = function(client) {
    throw new error.serverError('Client model method "getSecret" is not implemented')
}

module.exports.getRedirectUri = function(client) {
    throw new error.serverError('Client model method "getRedirectUri" is not implemented')
}

module.exports.checkRedirectUri = function(client, redirectUri) {
    throw new error.serverError('Client model method "checkRedirectUri" is not implemented')
}

module.exports.getById = function(clientId, callback) {
    throw new error.serverError('Client model method "getById" is not implemented')
}

module.exports.getByIdPromise = function(clientId) {
    throw new error.serverError('Client model method "getByIdPromise" is not implemented')
}

module.exports.checkSecret = function(client, clientSecret, callback) {
    throw new error.serverError('Client model method "checkSecret" is not implemented')
}

module.exports.checkSecretPromise = function(client, clientSecret) {
    throw new error.serverError('Client model method "checkSecretPromise" is not implemented')
}

module.exports.checkGrant = function(client, grant) {
    
    return true
}

module.exports.checkScope = function(client, scope) {
    switch(typeof scope) {
        case 'string':
            return []
            break
        case 'object':
            return []
            break
        default:
            return [] 
    }
}

module.exports.transformScope = function(scope, anchor = ' ') {
    if (!scope) return [];
    switch(typeof scope) {
        case 'string':
            return []
            break
        case 'object':
            return []
            break
        default:
            return [] 
    }
}

module.exports.name = "client"