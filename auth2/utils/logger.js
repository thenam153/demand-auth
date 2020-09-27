const winston = require('winston')

const ignorePrivate = format((info, opts) => {
    if (info.private) { return false; }
    return info;
})

var logger = winston.createLogger({
    format: winston.format.combine(
        ignorePrivate,
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: process.env.FILE_LOG || 'combined.log' })
    ]
})

module.exports = logger