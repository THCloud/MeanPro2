/**
 *   ./app/models/tag.js
 *   @file      related with tag model.
 *				some operations may require task model.
 *
 *   @author    TH_Cloud
 */

var mongoose = require('mongoose');
var P = mongoose.Promise = require('bluebird');
var task = require('./task.js');

var tagSchema = {
	tagName: {
		type: String,
		require: true
	}
};

var tag = module.exports = mongoose.model('tag', tagSchema);

module.exports.addTag = function(conditions, callback) {
	return callback ? 
			tag.create(conditions, callback) :
			tag.create(conditions);
};

module.exports.getTags = function(callback) {
	return tag.find(callback);
}

module.exports.deleteTag = function(conditions, callback) {
	return task.deleteTask(conditions)
				.then(() => tag.remove(conditions))
				.then(() => 'success')
				.nodeify(callback);
};

module.exports.deleteTagById = function(conditions, callback) {
		return tag.findById(conditions)
		      .then((data) => task.deleteTask({ tag: data.tag }))
					.then(() => tag.findByIdAndRemove(conditions))
					.then(() => 'success')
					.nodeify(callback);
};

// 这个函数有逻辑问题，没有考虑更新的tag跟已有的重复的情况
// 这个问题扔给前端的controller处理
module.exports.updateTag = function(conditions, updates, callback) {
	return task.updateTask(conditions, updates)
				.then(() => tag.findOneAndUpdate(conditions, updates).exec())
				.then(() => 'success')
				.nodeify(callback);
};

module.exports.updateTagById = function(conditions, updates, callback) {
	return tag.findById(conditions)
				.then((data) => task.updateTask({tagName: data.tagName}, updates))
				.then(() => tag.findByIdAndUpdate(conditions, updates).exec())
				.then(() => 'success')
				.nodeify(callback);
};
