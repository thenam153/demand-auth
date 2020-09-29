const async = require('async')
const Response = require('../utils/response')
const error =  require('../utils/error')
const responseType = require('../utils/response_type')

module.exports = function(params, pCallback) {
    var {req, res, client, scope, user, redirectUri, state} = params

    async.waterfall([
        function(callback) {
            if(!req.body || typeof req.body.decision == 'undefined' ) {
                return callback(new error.serverError(' . . . '))
            }
            if(!req.body.decision) {
                return callback(new error.serverError(' . . . '))
            }
            
            callback()
        },
        function(callback) {
            let clientModel = req.auth.model.client
            let userModel = req.auth.model.user
            let ttl = 60 * 10
            req.auth.model.accessToken.create(clientModel.getId(client), userModel.getId(user), scope, function(err, accessToken) {
                if(err) {
                    return callback(err)
                }
                if(!accessToken) {
                    return callback(new error.serverError(' ... '))
                }
                callback(null, accessToken)
            }, ttl)
        }
    ], function(err, accessToken) {
        let response = new Response(req, res)
        if(err) {
            pCallback(err)
            return response.error(err, redirectUri)
        }
        pCallback(null)
        let expires = 60 * 60 * 24
        let responseToken = new responseType.Token(accessToken, state, {expires})
        return response.data(responseToken, redirectUri)
    })
}