/**
 *  ./app/models/login.js
 *  @file    relate with task table.
 *
 *  @author  TH_Cloud
 */

var mongoose = require('mongoose');
var P = mongoose.Promise = require('bluebird');

var taskSchema = mongoose.Schema({
	taskName: {
		type: String,
		require: true
	},
	total: {
		type: Number,
		min: 2,
		max: 5,
		require: true
	},
	current: {
		type: Number,
		require: true
	},
	state: {
		type: String,
		enum: ['finished', 'unfinished'],
		require: true
	},
	statusName: {
		type: Array
	},
	reporters: {
		type: Array
	},
	tagName: {
		type: String,
		require: true
	},
	description: {
		type: String
	}
});

var task = module.exports = mongoose.model('task', taskSchema);

module.exports.getTasks = function(callback, limit) {
	return task.find(callback).limit(limit);
};

// conditions include taskName.
module.exports.getTaskInfo = function(conditions, callback) {
	return task.findOne(conditions, callback);
};

module.exports.getTasksByTag = function(conditions, callback, limit) {
	return task.find(conditions, callback).limit(limit);
};

// conditions include _id
module.exports.getTaskInfoById = function(conditions, callback) {
		return task.findById(conditions, callback);
};

// conditions include taskName. updates include total | statusName | tag | description.
module.exports.updateTask = function(conditions, updates, callback) {
	return task.update(conditions, updates, { multi: true }, callback);
};

// conditions include taskName, updates include username.
module.exports.pushTask = function(conditions, updates, callback) {
	return task.findOne(conditions)
				.then(data => updateStatus(data, updates.username))
				.then(newData => task.findOneAndUpdate(conditions, newData).exec())
				.nodeify(callback);
};

module.exports.deleteTask = function(conditions, callback) {
	return task.remove(conditions, callback);
};

module.exports.deleteTaskById = function(conditions, callback) {
	return task.findByIdAndRemove(conditions, callback);
};

module.exports.addTask = function(conditions, callback) {
	var query = {
		taskName: conditions.taskName
	};

	return task.count(query)
			.then(count => {
				if (count > 0) {
					return P.reject(new P.Operational('exist'));
				}
				return task.create(conditions).then(() => "success");
			})
			.nodeify(callback);
};


function updateStatus(data, reporter) {
	data.reporters.push(reporter);
	data.current = data.current + 1;
	if (data.current > data.total) {
		data.state = "finished";
	}
	return data;
}
