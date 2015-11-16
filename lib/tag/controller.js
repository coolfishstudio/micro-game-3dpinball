'use strict';

var tagManager = require('./manager');
var errors = require('../util/error').errors;

//插入数据
module.exports.insert = function (req, res, next)
{
    //todo 校验
    var tagFields = {
        name: req.body.name,
        icon: req.body.icon 
    };
    tagManager.insert(tagFields, function (error, tag)
    {
        if (error) return next(error);
        res.status(201).json({ item: tag });
    });
};
//根据id查找
module.exports.getByID = function (req, res, next)
{
    tagManager.getByID(
        req.params.tagID, 
        function (error, tag)
    {
        if (error) return next(error);
        if (!tag) return next(errors.tag.not.found);
        res.json({ item: tag });
    }); 
};
//查看全部
module.exports.findAll = function (req, res, next)
{
    tagManager.findAll(function (error, paginatedTags)
    {
        if (error) return next(error);
        res.json({
            meta: paginatedTags.meta,
            list: paginatedTags.list
        });
    });
};