const error = require('../utils/error')

/**
 * Typical refreshToken schema:
 * userId:   { type: "object", required: true },
 * clientId: { type: "object", required: true },
 * token:    { type: "string", required: true, unique: true },
 * scope:  { type: "array", required: false,
 *     items: { type: "string", enum: ["possible", "scope", "values"] },
 * }
 *
 * Primary key: token
 * Unique key: userId + clientId pair should be unique
 */

module.exports.getUserId = function(refreshToken) {
    throw new error.serverError('Refesh Token model method "getUserId" is not implemented')
}

module.exports.getClientId = function(refreshToken) {
    throw new error.serverError('Refesh Token model method "getClientId" is not implemented')
}

module.exports.getScope = function(refreshToken) {
    throw new error.serverError('Refesh Token model method "getScope" is not implemented')
}

module.exports.getByToken = function(token, callback) {
    throw new error.serverError('Refesh Token model method "getByToken" is not implemented')
}

module.exports.getByTokenPromise = function(token) {
    throw new error.serverError('Refesh Token model method "getByTokenPromise" is not implemented')
}

module.exports.removeByUserIdClientId = function(userId, clientId, callback) {
    throw new error.serverError('Refesh Token model method "removeByUserIdClientId" is not implemented')
}

module.exports.removeByUserIdClientIdPromise = function(userId, clientId) {
    throw new error.serverError('Refesh Token model method "removeByUserIdClientIdPromise" is not implemented')
}

module.exports.removeByRefreshToken = function(refreshToken, callback) {
    throw new error.serverError('Refesh Token model method "removeByRefreshToken" is not implemented')
}

module.exports.removeByRefreshTokenPromise = function(refreshToken) {
    throw new error.serverError('Refesh Token model method "removeByRefreshTokenPromise" is not implemented')
}

module.exports.create = function(userId, clientId, scope, callback, ttl) {
    throw new error.serverError('Refesh Token model method "create" is not implemented')
}

module.exports.createPromise = function(userId, clientId, scope, ttl) {
    throw new error.serverError('Refesh Token model method "createPromise" is not implemented')
}

module.exports.renewRefreshToken = function(refreshToken, callback) {
    throw new error.serverError('Refesh Token model method "renewRefreshToken" is not implemented')
}

module.exports.name = "refreshToken"