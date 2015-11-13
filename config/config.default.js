module.exports = {
    appName: 'fortune',
    log4js: {
        appenders: [
            {type: 'console'}
        ]
    },
    express: {
        port: process.env.port || 3000,
    },
    mongo: {
        url: '***',
    },
};