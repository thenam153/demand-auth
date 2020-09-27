const query = require('query-string')
const oauthError = require('../utils/error')
class Response {
    constructor(req, res, otps) {
        this.req = req
        this.res = res
        this.code = otps.code || 200
    }
    data (obj, redirectUri, code, anchor) {
        if(redirectUri) {
            if (anchor) {
                redirectUri += '#'
            }else {
                redirectUri += redirectUri.indexOf('?') == -1 ? '?' : '&'
            }
            if (req.query.state) {
                obj.state = req.query.state
            }
            redirectUri += query.stringify(obj)
            redirect(req, res, redirectUri)
        }else {
            send(this.req, this.res, code || this.code, obj)
        }
    }

    error (error, redirectUri) {
        if(!(error instanceof oauthError.oauth)) {
            req.oauth.logger.error(error.stack)
            error = new oauthError.serverError('Uncaught exception')
        }else {
            req.oauth.logger.error(error.stack)
        }
        let obj = {
            error: error.code,
            message: error.message
        }
        if(redirectUri) {
            redirectUri += redirectUri.indexOf('?') == -1 ? '?' : '&'
            if (req.query.state) {
                obj.state = req.query.state
            }
            redirectUri += query.stringify(obj)
            redirect(this.req, this.res, redirectUri)
        }else {
            send(this.req, this.res, error.status || error.code, obj)
        }
    }

}

function send(req, res, code, obj) {
    res.statusCode = code
    res.header('Cache-Control', 'no-store');
    res.header('Pragma','no-cache');
    res.send(obj);
    res.oauth.logger.debug('Response', obj)
}
function redirect(req, res, redirectUri) {
    res.statusCode = 302
    res.header('Location', redirectUri);
    res.end();
    req.oauth2.logger.debug('Redirect to: ' + redirectUri);
}

module.exports = Response
// new Response(req, res).data({}, uri)