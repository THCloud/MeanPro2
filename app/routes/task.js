/**
 *  ./app/routes/task.js
 *
 *  @file     Include the task RESTFUL.
 *
 *  @author   TH_Cloud
 *
 */

var express = require('express');
var task = require('../models/task.js');
var router = express.Router();

router

	// get all tasks. no need session.
	.get('/', function (req, res, next) {
		task.getTasks((err, data) => {
			if (err) {
				res.json({ errInfo: 'get task failed.' });
			} else {
				res.json(data);
			}
		}, 10);
    })

    // get tasks by tag. no need session.
    .get('/:tag', function (req, res, next) {
    	var query = {
    		tagName: req.params.tag
    	};
    	task.getTasksByTag(query, (err, data) => {
    		if (err) {
    			res.json({ errInfo: 'failed' });
    		} else {
    			res.json(data);
    		}
    	}, 10);
    })

	// get task info.
	.get('/edit/:id', function (req, res, next) {
		var query = {
			_id: req.params.id
		};
		task.getTaskInfoById(query, (err, data) => {
			if (err) {
				res.json({ errInfo: 'get task failed.' });
			} else {
				res.json(data);
			}
		});
	})

    // admin user add a task, need admin session.
    // req.body include a json of task.
	.post('/', function (req, res, next) {
		if (req.session.userRole != 'admin') {
			res.json({ errInfo: 'wrong userRole' });
		} else {
			var newTask = req.body;
			task.addTask(newTask, (err, data) => {
				var result = {};
				if (err) {
					result.errInfo = err.cause == 'exist' ?
						'task has already exist' : 
						'task create failed';
				} else {
					result.state = 'success';
				}
				res.json(result);
			});
		}
	})

	// normal user push the task, need session.
	.post('/edit/:id', function (req, res, next) {
		if (!req.session.username) {
			res.json({ errInfo: 'no user logined.' });
		} else if (req.session.userRole != 'normal') {
			res.json({ errInfo: 'wrong userRole' });
		} else {
			var query = {
				_id: req.params.id
			};
			var updates = {
				username: req.session.username
			};
			task.pushTask(query, updates, (err, data) => {
				if (err) {
					res.json({ errInfo: 'post task failed.'});
				} else {
					res.json(data);
				}
			});
		}
	})

	// admin user update the task, need admin session.
	// req.body include a json of task.
	.put('/edit/:id', function (req, res, next) {
		if (req.session.userRole != 'admin') {
			res.json({ errInfo: 'wrong userRole' });
		} else {
			var query = {
				_id: req.params.id
			};
			var updates = req.body;
			task.updateTask(query, updates, (err, data) => {
				if (err) {
					res.json({ errInfo: 'update task failed.' });
				} else {
					res.json({ state: 'success' });
				}
			});
		}
	})

	// admin user delete the task. need admin session.
	.delete('/edit/:id', function (req, res, next) {
		var result = {};		
		if (req.session.userRole != 'admin') {
			result.errInfo = 'wrong userRole';
			res.json(result);
		} else { 
			var conditions = {
				_id: req.params.id
			};
			task.deleteTaskById(conditions, (err, data) => {
				if (err) {
					result.errInfo = 'delete task failed.';
				} else {
					result.state = 'success';
				}
				res.json(result);
			});
		}
	});

module.exports = router;	