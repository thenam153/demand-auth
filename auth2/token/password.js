const async = require('async')
const error = require('../utils/error')
const GRANT_TYPE = require('../utils/message').GRANT_TYPE
const Response = require('../utils/response')

module.exports = function(params, pCallback) {
    let {req, res, client, scope} = params
    let username = password = user = null
    let model = req.auth.model
    async.waterfall([
        function(callback) {
            if(!req.body.username || !req.body.password) {
                return callback(new error.invalidRequest(' . . . '))
            }
            username = req.body.username
            password = req.body.password
            callback()
        },
        function(callback) {
            scope = model.client.transformScope(scope)
            scope = model.client.checkScope(client, scope)
            if(!scope) {
                return callback(new error.invalidRequest(' . . . '))
            }
            callback()
        },
        function(callback) {
            model.user.getByUsername(username, function(err, data) {
                if(err) {
                    return callback(new error.invalidRequest(' . . . '))
                }
                if(!data) {
                    return callback(new error.invalidRequest(' . . . '))
                }
                user = data
                callback()
            })
        },
        function(callback) {
            if(!model.user.checkPassword(user, password)) {
                return callback(new error.invalidRequest(' . . . '))
            }
            callback()
        },
        function(callback) {
            model.refreshToken.removeByUserIdClientId(model.user.getId(client), model.client.getId(client), function(err) {
                if(err) {
                    return callback(new error.invalidRequest('....'))
                }
                callback()
            })
        },
        function(callback) {
            if(!model.client.checkGrantType(client, GRANT_TYPE.REFRESH_TOKEN)) {
                return callback()
            }
            
            model.refreshToken.create(model.client.getClientId(client), model.user.getId(user), scope, function(err, data) {
                if(err) {
                    return callback(new error.serverError('. . . '))
                }
                callback(null, {refreshToken: data})
            })
        },
        function(callback) {
            model.accessToken.create(model.client.getClientId(client), model.user.getId(user), scope, function(err, data) {
                if(err) {
                    return callback(new error.serverError(' . . . '))
                }
                if(!data) {
                    return callback(new error.serverError(' . . . '))
                }
                callback(null, {accessToken: data, expires_in: model.accessToken.getTtl(data)})
            }, ttl)
        }
    ], function(err, data) {
        let response = new Response(req, res)
        if(err) {
            pCallback(err)
            return response.error(err)
        }
        pCallback()
        data.token_type = 'bearer'
        response.data(data)
    })

}