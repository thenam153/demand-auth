const async = require('async')
const error = require('../utils/error')
const GRANT_TYPE = require('../utils/message').GRANT_TYPE
const Response = require('../utils/response')

module.exports = function(params, pCallback) {
    let {req, res, scope} = params
    let refreshTokenObj = refreshToken = user = accessTokenObj = null
    let model = req.auth.model

    async.waterfall([
        function(callback) {
            if(!req.body.refresh_token) {
                return callback(new error.invalidRequest(' . . . '))
            }
            refreshToken = req.body.refresh_token
            callback()
        },
        function(callback) {
            scope = model.client.transformScope(scope)
            scope = model.client.checkScope(client, scope)
            if(!scope) {
                return callback(new error.serverError(' . . . '))
            }
            callback()
        },
        function(callback) {
            model.refreshToken.getByRefreshToken(refreshToken, function(err, data) {
                if(err) {
                    return callback(new error.serverError('. . . '))
                }
                if(!data) {
                    return callback(new error.serverError('. . . '))
                }
                if(model.refreshToken.getClientId(data) != model.client.getClientId(data)) {
                    return callback(new error.invalidClient(' . . . '))
                }
                refreshTokenObj = data
                callback()
            })
        }, 
        function(callback) {
            model.user.getById(model.refreshToken.getUserId(refreshTokenObj), function(err, data) {
                if(err) {
                    return callback(new error.serverError('. . . '))
                }
                if(!data) {
                    return callback(new error.serverError('. . . '))
                }
                user = data
                callback()
            })
        },
        function(callback) {
            model.accessToken.getByClientIdUserId(model.client.getId(client), model.user.getId(user), function(err, data) {
                if(err) {
                    return callback(new error.serverError('...'))
                }
                if(!data) {
                    return callback(new error.serverError(' . . . '))
                }
                accessTokenObj = data
                return
            })
        },
        function(callback) {
            if(req.auth.renewRefreshToken) {
                return model.refreshToken.renewRefreshToken(accessTokenObj, function(err, data) {
                    if(err) {
                        return callback(new error.serverError(' . . . '))
                    }
                    if(!data) {
                        return callback(new error.serverError(' . . . '))
                    }
                    callback({refresh_token: model.refreshToken.getRefreshToken(data)})
                })
            }
            callback()
        },
        function(callback) {
            if(accessTokenObj) {
                if(!req.auth.renewAccessToken) {
                    return model.accessToken.getTtl(accessTokenObj, function(err, data) {
                        if(err) {
                            return callback(new error.serverError(' . . . '))
                        }
                        if(!data) {
                            accessTokenObj = null
                            return callback()
                        }
                        callback({access_token: model.accessToken.getAccessToken(accessTokenObj), expires_in: data})
                    })
                }else {
                    return model.accessToken.renewAccessToken(accessTokenObj, function(err, data) {
                        if(err) {
                            return callback(new error.serverError(' . . . '))
                        }
                        if(!data) {
                            accessTokenObj = null
                            return callback()
                        }
                        accessTokenObj = data
                        callback({access_token: model.accessToken.getAccessToken(accessTokenObj), expires_in: data})
                    })
                }
            }
            callback()
        },
        function(callback) {
            if(!accessTokenObj) {
                return model.accessToken.create(model.user.getId(user), model.client.getId(client), scope, function(err, newAccessTokenObj) {
                    if(err) {
                        return callback(new error.serverError(' . . . '))
                    }
                    if(!newAccessTokenObj) {
                        return callback(new error.serverError(' . . . '))
                    }
                    callback({access_token: model.accessToken.getAccessToken(newAccessTokenObj), expires_in: model.accessToken.getTtl(newAccessTokenObj)})
                })
            }
            callback()
        }
    ], function(err, data) {
        let response = new Response(req, res)
        if(err) {
            pCallback(err)
            return response.error(err)
        }
        pCallback(err)
        data.token_type = 'bearer'
        response.data(data)
    })

}