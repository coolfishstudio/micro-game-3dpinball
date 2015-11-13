'use strict';

var async = require('async');

var Tag = require('./model');

//根据id查找数据
module.exports.getByID = Tag.getByID.bind(Tag);

//插入数据
module.exports.insert = function (tagFields, callback)
{
    var tag = new Tag(tagFields);
    //检查数据格式
    Tag.validateAndFormatError(tag, function (error)
    {
        if (error) return callback(error, null);
        //录入数据
        tag.save(callback);
    });
};

//查找全部
module.exports.findAll = function (callback)
{
    //此类数据 返回格式包含列表和数量 用来处理后期分页问题
    async.parallel({
        total: Tag.countAll.bind(Tag),
        tags: Tag.findAll.bind(Tag)
    }, function (error, args)
    {
        if (error) return callback(error, null);
        callback(
            null, 
            {
                meta: { count: args.total, length: args.tags.length },
                list: args.tags
            }
        );
    });
};