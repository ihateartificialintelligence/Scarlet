const winston = require('winston');

// I needed to make a commit lol

const logConfigUser = {
    'transports': [
        new winston.transports.File({
            filename: './UserLogs.log'
        })
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `User Logs`
        }),
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
}, logConfigSystem = {
    'transports': [
        new winston.transports.File({
            filename: './SystemLogs.log',
        }),
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `System Logs`
        }),
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
};

module.exports = {
    userlog: winston.createLogger(logConfigUser),
    syslog: winston.createLogger(logConfigSystem),
}