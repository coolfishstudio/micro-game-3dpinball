'use strict';

var mongoose = require('../util/db').mongoose;
var Schema = mongoose.Schema;

var errors = require('../util/error').errors;
/**
 *  数据模型
 *
 *  名字，图标，创建时间
 */
var TagSchema = new Schema(
    {
        name: { type: String, required: true },
        icon: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
    },
    {
        collection: 'tag'
    }
);

/**
 *  数据操作监听
 */
//数据格式校验
TagSchema.static('validateAndFormatError', function (tag, callback)
{
    return tag.validate(function (error)
    {
        callback(error);
    });
});
//根据id查找
TagSchema.static('getByID', function (tagID, callback)
{
    return this.findById(tagID, function (error, tag)
    {
        if (error && 'CastError' === error.name && 'ObjectId' === error.kind)
            return callback(errors.tag.invalid.id, null);
        if (error)
            return callback(error, null);

        callback(null, tag);
    });
});
//查找全部
TagSchema.static('findAll', function (callback)
{
    var query = this.find({});
    //todo 分页
    query.exec(callback);
});
//全部数量
TagSchema.static('countAll', function (callback)
{
    return this.count({}, callback);
});
//保存
TagSchema.pre('save', function (next)
{
    this.updatedAt = new Date();
    next();
});
//处理 _id
TagSchema.set('toJSON', { getters: true, virtuals: true, versionKey: false });
if (!TagSchema.options.toJSON) TagSchema.options.toJSON = {};
TagSchema.options.toJSON.transform = function (doc, ret, options)
{
    delete ret._id;
};

var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;