const error = require('../utils/error')

/**
 * Typical code schema:
 * userId:   { type: "object", required: true },
 * clientId: { type: "object", required: true },
 * code:    { type: "string", required: true, unique: true },
 * scope:  { type: "array", required: false,
 *     items: { type: "string", enum: ["possible", "scope", "values"] },
 * }
 *
 * Primary key: code
 * Unique key: userId + clientId pair should be unique
 */

module.exports.getUserId = function(code) {
    throw new error.serverError('Code model method "getUserId" is not implemented')
}

module.exports.getClientId = function(code) {
    throw new error.serverError('Code model method "getClientId" is not implemented')
}

module.exports.getScope = function(code) {
    throw new error.serverError('Code model method "getScope" is not implemented')
}

module.exports.getByCode = function(code, callback) {
    throw new error.serverError('Code model method "getByCode" is not implemented')
}

module.exports.getByCodePromise = function(code) {
    throw new error.serverError('Code model method "getByCodePromise" is not implemented')
}

module.exports.create = function(userId, clientId, scope, ttl, callback) {
    throw new error.serverError('Code model method "error" is not implemented')
}

module.exports.createPromise = function(userId, clientId, scope, ttl) {
    throw new error.serverError('Code model method "createPromise" is not implemented')
}

module.exports.removeByCode = function(code) {
    throw new error.serverError('Code model method "removeByCode" is not implemented')
}

module.exports.ttl = 60 * 60 * 24

module.exports.name = "code"