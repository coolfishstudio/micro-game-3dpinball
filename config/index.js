'use strict';

var debug = require('debug')('server:log');
debug.log = console.log.bind(console);

var nodeEnv = (function ()
{
    var env = process.env.NODE_ENV;
    var availableEnvs = ['development', 'production', 'testing'];

    if (!env) {
        env = process.env.NODE_ENV = 'development';
    } else if (availableEnvs.indexOf(env) === -1) {
        debug('Error: NODE_ENV must be one of the following: (' + availableEnvs.join(', ') + ')');
        process.exit(1);
    }

    return env;
})();

var config;
try {
    config = require('./config_current.js');
    config.nodeEnv = nodeEnv;
} catch (e) {
    console.error('ERROR: Config file doesn\'t exist or incorrect');
    process.exit(1);
}

console.log('Server NODE_ENV: %s', nodeEnv);

module.exports = config;