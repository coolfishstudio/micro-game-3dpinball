'use strict';

var errorHandler = require('../lib/util/errorHandler');

module.exports = function (app)
{
    //用来检测运行是否成功
    app.get('/ping', function (req, res)
    {
        res.end('OK');
    });

    //标签类型请求转发
    app.use('/api/tag', require('../lib/tag/router'));

    // 错误拦截
    app.use(errorHandler.handler404);
    app.use(errorHandler.errorHandler);
};