'use strict';

var express = require('express');
var router = express.Router();

var tagController = require('./controller');

/**
 * 路由转发
 */

router.post('/', tagController.insert);

router.get('/all', tagController.findAll);

router.get('/:tagID', tagController.getByID);

module.exports = router;