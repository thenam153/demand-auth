const async = require('async')
const error = require('../utils/error')
const GRANT_TYPE = require('../utils/message').GRANT_TYPE
const Response = require('../utils/response')

module.exports = function(params, pCallback) {
    let {req, res, client, scope,} = params
    let model = req.auth.model
    async.waterfall([
        function(callback) {
            scope = model.client.transformScope(scope)
            scope = model.client.checkScope(client, scope)
            if(!scope) {
                return callback(new error.serverError(' . . . '))
            }
            callback()
        },
        function(callback) {
            model.accessToken.create(null, model.client.getClientId(client), scope, function(err, data) {
                if(err) {
                    return callback(new error.serverError(' . . . '))
                }
                callback({accessToken: data})
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