var pathToError = require('path').join(__dirname, "error")

require('fs').readdirSync(pathToError)
.forEach(file => {
    if(file != 'index.js') {
        let name = require(file).name
        module.exports[name] = require(file)
    }
})
