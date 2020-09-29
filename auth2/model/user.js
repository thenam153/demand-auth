const error = require('../utils/error')

/**
 * User schema
 * Id
 * Username
 * Email
 * Password
 * Role
 * Phone 
 */

module.exports.getId = function(user) {
    throw new error.serverError(' model method "getId" is not implemented')
}

module.exports.getById = function(userId, callback) {
    throw new error.serverError('User model method "getById" is not implemented')
}

module.exports.getByIdPromise = function(userId) {
    throw new error.serverError('User model method "getByIdPromise" is not implemented')
}

module.exports.getByUserName = function(username, callback) {
    throw new error.serverError('User model method "getByUserName" is not implemented')
}

module.exports.getByUserNamePromise = function(username) {
    throw new error.serverError('User model method "getByUserNamePromise" is not implemented')
}

module.exports.checkPassword = function(username, password, callback) {
    throw new error.serverError('User model method "checkPassword" is not implemented')
}

module.exports.checkPasswordPromise = function(username, password) {
    throw new error.serverError('User model method "checkPasswordPromise" is not implemented')
}

module.exports.getByRequest = function(req) {
    throw new error.serverError('User model method "getByRequest" is not implemented')
}

module.exports.getFromRequest = function(req) {
    throw new error.serverError('User model method "getByRequest" is not implemented')
}

module.exports.name = "user"