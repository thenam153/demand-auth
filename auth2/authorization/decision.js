const error = require('../utils/error')

module.exports = function(params) {
    throw new error.serverError('Server not implement decision')
}