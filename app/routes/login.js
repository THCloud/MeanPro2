/**
 *  ./app/routes/login.js
 *
 *  @file     Include the login RESTFUL.
 *
 *  @author   TH_Cloud
 *
 */

var express = require('express');
var login = require('../models/login.js');
var session = require('express-session');
var sessionConf = require('../../config/session-config.js');
var router = express.Router();

router
	.use(session(sessionConf))

	// check the user for login.
	// req.body include the username and password.
	.post('/', function (req, res, next) {
		var query = req.body;
		login.queryUser(query, (err, data) => {
			if (err) {
				res.json({ errInfo: 'query user failed.' });
			} else if (data) {
				req.session.userRole = 'normal';
				req.session.username = data.username;
				res.json(data);
			} else {
				res.json({ errInfo: 'auth failed.' });
			}
		});
	})

	// for user update the password.
	// req.body include the password.
	.put('/', function (req, res, next) {
		var query = {
			username: req.session.username
		};
		var updates = req.body;
		login.updatePassword(query, updates, (err, data) => {
			if (err) {
				res.json({ errInfo: 'update password failed' });
			} else {
				res.json({ state: 'success' });
			}
		})
	})

	// for user delete.
	// THIS API HAS BUG. DO NOT USE.
	.delete('/:id', function (req, res, next) {
		var query = {
			username: req.session.username
		};
		login.deleteUser(query, (err, data) => {
			if (err) {
				res.json({ errInfo: 'delete user failed' });
			} else {
				res.json({ state: 'success' });
			}
		})
	});

module.exports = router;