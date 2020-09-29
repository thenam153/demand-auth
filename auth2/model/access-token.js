const error = require('../utils/error')

/**
* Typical accessToken schema:
* userId:   { type: "object", required: true },
* clientId: { type: "object", required: true },
* token:    { type: "string", required: true, unique: true },
* scope:  { type: "array", required: false,
*     items: { type: "string", enum: ["possible", "scope", "values"] },
* }
*/
module.exports.getToken = function(accessToken) {
    throw new error.serverError('accessToken model not implemented method "getToken"')
}

module.exports.getByToken = function(token, callback) {
    throw new error.serverError('accessToken model not implemented method "getByToken"')
}

module.exports.getByTokenPromise = function(token) {
    throw new error.serverError('accessToken model not implemented method "getByTokenPromise"')
}

module.exports.getByUserIdClientId = function(userId, clientId) {
    throw new error.serverError('accessToken model not implemented method "getByUserIdClientId"')
}

module.exports.getByUserIdClientIdPromise = function(userId, clientId) {
    throw new error.serverError('accessToken model not implemented method "getByUserIdClientIdPromise"')
}

module.exports.checkTTL = function(accessToken) {
    throw new error.serverError('accessToken model not implemented method "checkTTL"')
}

module.exports.getTTL = function(accessToken) {
    throw new error.serverError('accessToken model not implemented method "getTTL"')
}

module.exports.create = function(userId, clientId, scope, callback, ttl) {
    throw new error.serverError('accessToken model not implemented method "create"')
}

module.exports.createPromise = function(userId, clientId, scope) {
    throw new error.serverError('accessToken model not implemented method "createPromise"')
}

module.exports.ttl = 60 * 60 * 24

module.exports.name = "accessToken"