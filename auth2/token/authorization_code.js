const async = require('async')
const error = require('../utils/error')
const GRANT_TYPE = require('../utils/message').GRANT_TYPE
const Response = require('../utils/response')

module.exports = function(params, pCallback) {
    let {req, res, client} = params
    let code = req.body.code
    let redirectUri = req.body.redirect_uri
    let model = req.auth.model
    let codeObj

    async.waterfall([
        function(callback) {
            model.code.getByCode(code, function(err, data) {
                if(err) {
                    return callback(new error.invalidRequest(' . . . '))
                }
                if(!data) {
                    return callback(new error.serverError(' . . . '))
                }
                codeObj = data
                if(!model.client.getId(client) != model.code.getClientId(codeObj)) {
                    return callback(new err.invalidRequest(' . . .'))
                }
                callback()
            })
        },
        function(callback) {
            model.refreshToken.removeByUserIdClientId(model.code.getUserId(codeObj), model.client.getClientId(client), function(err) {
                if(err) {
                    return callback(new error.serverError(' . . . '))
                }
                callback()
            })
        },
        function(callback) {
            if(!model.client.checkGrantType(client, GRANT_TYPE.REFRESH_TOKEN)) {
                return callback()
            }
            
            model.refreshToken.create(model.client.getClientId(client), model.code.getUserId(codeObj), model.code.getScope(codeObj), function(err, data) {
                if(err) {
                    return callback(new error.serverError('. . . '))
                }
                callback(null, {refreshToken: data})
            })
        },
        function(callback) {
            // model.accessToken.removeByUserIdClientId(model.client.getClientId(client), model.code.getUserId(codeObj), function(err) {
            //     if(err) {
            //         return callback(new error.serverError(' . . . '))
            //     }
            //     callback()
            // })

            model.accessToken.create(model.client.getClientId(client), model.code.getUserId(codeObj), model.code.getScope(codeObj), function(err, data) {
                if(err) {
                    return callback(new error.serverError(' . . . '))
                }
                if(!data) {
                    return callback(new error.serverError(' . . . '))
                }
                callback(null, {accessToken: data, expires_in: model.accessToken.getTtl(data)})
            }, ttl)
        },
        function(callback) {
            model.code.removeByCode(code, function(err) {
                if(err) {
                    return callback(new error.serverError(' . . . '))
                }
                callback()
            })
        }
    ], function(err, data) {
        let response = new Response(req, res)
        if(err) {
            pCallback(err)
            return new response.error(err)
        }
        data.token_type = 'bearer'
        pCallback()
        return response.data(data)
    })  

}