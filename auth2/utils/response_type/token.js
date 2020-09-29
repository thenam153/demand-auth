class Token {
    constructor(accessToken, state, options) {
        this.state = state
        this.access_token = accessToken
        this.expires = this.expires
        this.token_type = options.token_type || 'Basic'
    }
}

module.exports = Token