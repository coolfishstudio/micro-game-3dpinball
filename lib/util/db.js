'use strict';

var config = require('../../config');
var mongoose = require('mongoose');//引入数据库相关模块
//连接数据库
mongoose.connect(
	config.mongo.url,//数据库地址
	{
		db: {
			native_parser: true
		},
		server: {
			socketOptions: {
				keepAlive: 1
			}
		}
	}
);

var db = mongoose.connection;
var isReady = false;
/**
 * 监听数据库连接状态
 */
//始终监听报错信息
db.on('error', function (error)
{
	console.error('数据库连接异常：', error);
});

//监听一次连接成功信息
db.once('open', function ()
{
	console.info('数据库已建立连接。');
	isReady = true;
});

//用于检测数据库是否正常连接
module.exports.onReady = function (callback)
{
	if (isReady) return callback();
};

module.exports.mongoose = mongoose;