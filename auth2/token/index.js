const async = require('async')
const error = require('../utils/error')
const authorizationCode = require('./authorization_code')
const clientCredentials = require('./client_credentials')
const password = require('./password')
const refreshToken = require('./refresh_token')
const GRANT_TYPE = require('../utils/message').GRANT_TYPE
const Response = require('../utils/response')

module.exports = function(req, res) {
    var clientId, client, clientSecret, grantType
    var model = req.auth.model
    async.waterfall([
        function(callback) {
            if(req.body.client_id && req.body.client_secret) {
                clientId = req.body.client_id
                clientSecret = req.body.client_secret
                return callback()
            }
            if(!req.headers || !req.headers.authorization) {
                return callback(new error.invalidRequest(' . . .'))
            }
            let pieces = req.headers.authorization.split(' ')
            if(pieces[0] !== 'Basic') {
                return callback(new error.invalidRequest(' . . . '))
            }
            // use base64 for decode auth
            pieces = new Buffer(pieces[1], 'base64').toString('ascii').split(':');
            if(!pieces || pieces.length != 2) {
                return callback(new error.invalidRequest(' . . . . '))
            }
            clientId = pieces[0]
            clientSecret = pieces[1]
            callback()
            // use jwt for decode auth
        },
        function(callback) {
            if(!req.body.grant_type) {
                return callback(new error.invalidRequest(' . . . '))
            }
            grantType = req.body.grant_type
            callback()
        },
        function(callback) {
            model.client.getById(clientId, function(err, data) {
                if(err) {
                    return callback(new error.serverError(err))
                }
                if(!data) {
                    return callback(new error.serverError('. . . '))
                }
                client = data
                callback()
            })
        },
        function(callback) {
            model.client.checkSecret(client, clientSecret, function(err, valid) {
                if(err) {
                    return callback(new error.serverError(err))
                }
                if(!valid) {
                    return callback(new error.invalidRequest('. . . '))
                }
                callback()
            })
        },
        function(callback) {
            if(!model.client.checkGrantType(client, grantType) && grantType != GRANT_TYPE.REFRESH_TOKEN) {
                return callback(new error.invalidRequest('. . . .'))
            }
            callback()
        }
    ], function(err) {
        let response = new Response(req, res)
        if(err) {
            return response.error(err)
        }
        switch(grantType) {
            case GRANT_TYPE.AUTHORIZATION_CODE:
                authorizationCode({req, res, client, scope})
                break
            case GRANT_TYPE.CLIENT_CREDENTIALS:
                clientCredentials()
                break
            case GRANT_TYPE.PASSWORD:
                password()
                break
            case GRANT_TYPE.REFRESH_TOKEN:
                refreshToken()
                break
            default:
                response.error(new error.invalidRequest(' . . . '))
        }
    })

}