'use strict';

var errorHelper = require('../util/error');

module.exports = {
    not: {
        found: errorHelper.generate(400, 10101, 'Tag is not found in the database.'),
    }
};