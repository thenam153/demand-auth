const async = require('async')
const authorizedCode = require('./authorized_code')
const implicit = require('./implicit')
const error = require('../utils/error')
const RESPONSE_TYPE = require('../utils/message').RESPONSE_TYPE 
const GRANT_TYPE = require('../utils/message').GRANT_TYPE 
const Response = require('../utils/response')

module.exports = function(req, res, next) {
    
    var clientId, redirectUri, responseType, grantType, state, client, user
    
    async.waterfall([
        function(callback) {
            state = req.query.state
            callback()
        },
        function(callback) {
            if(!req.query.redirect_uri) {
                return callback(new error.invalidRequest('Redirect Uri must have'))
            }
            redirectUri = req.query.redirect_uri
            callback()
        },
        function(callback) {
            if(!req.query.client_id) {
                return callback(new error.invalidRequest('Redirect Uri must have'))
            }
            if(!req.query.client_secret) {
                return callback(new error.invalidRequest('Redirect Uri must have'))
            }
            clientId = req.query.client_id
            callback()
        },
        function(callback) {    
            if(!req.query.response_type) {
                return callback(new error.invalidRequest('Response Type must have'))
            }
            responseType = req.query.response_type
            callback()
        },
        function(callback) {
            switch(responseType) {
                case RESPONSE_TYPE.CODE: 
                    grantType = GRANT_TYPE.AUTHORIZATION_CODE
                    break
                case RESPONSE_TYPE.TOKEN:
                    grantType = GRANT_TYPE.IMPLICIT
                default:
                    return callback(new error.invalidRequest('Response Type must have'))
            }
            callback()
        },
        function(callback) {
            req.auth.model.client.getById(clientId, function(err, data) {
                if(err) {
                    return callback(new error.serverError('error'))
                }
                if(!data) {
                    return callback(new error.invalidClient('...'))
                }
                client = data
                callback()
            })
        },
        function(callback) {
            if(!req.auth.model.client.getRedirectUri(client)) {
                return callback(new error.serverError())
            }
            if(!req.auth.model.client.checkRedirectUri(client, redirectUri)) {
                return callback(new error.serverError())
            }

            callback()
        },
        function(callback) {
            if(!req.auth.model.client.checkGrantType(client, grantType)) {
                return callback(new error.serverError('...'))
            }
            callback()
        },
        function(callback) {
            scope = req.auth.model.client.transformScope(req.query.scope)
            scope = req.auth.model.client.checkScope(client, scope)
            if(!scope) {
                return callback(new error.serverError('....'))
            }
            callback()
        },
        function(callback) {
            user = req.auth.model.user.getFromRequest(req)
            if(!user) {
                return callback(new error.serverError('...'))
            }
            callback()
        }
    ], function(err) {
        if(err) {
            return new Response(req, res).error(err, redirectUri)
        }
        if(req.method == 'GET') {
            return req.auth.decision()
        }
        if(grantType == GRANT_TYPE.AUTHORIZATION_CODE) {
            return authorizedCode({req, res, client, user, scope, redirectUri, state})
        }
        if(grantType == GRANT_TYPE.IMPLICIT) {
            return implicit({req, res, client, user, scope, redirectUri, state})
        }
    })

}