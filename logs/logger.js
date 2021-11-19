const winston = require("winston");

const logConfigUser = {
    'transports': [
        new winston.transports.File({
            filename: './logs/UserLogs.log'
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
            filename: "./logs/SystemLogs.log",
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