/**
 *	./config/db-init.js
 *  @file      used to init the mongodb.
 *
 *  @author    TH_Cloud
 *
 */
var mongoose = require('mongoose');
var path = require('path');
var p = require('bluebird');

var PROJECT_PATH = '/Users/thcloud/Documents/gra/Project';

var conf = {
	app: path.join(PROJECT_PATH, 'app'),
	config: path.join(PROJECT_PATH, 'config'),
	models: path.join(PROJECT_PATH, 'app', 'models'),
	routes: path.join(PROJECT_PATH, 'app', 'routes')
};


var db = require(path.join(conf.config, 'db-config.js'));
var username = require(path.join(conf.models, 'username.js'));
var login = require(path.join(conf.models, 'login.js'));
var tag = require(path.join(conf.models, 'tag.js'));
var task = require(path.join(conf.models, 'task.js'));


mongoose.connect(db.url);
mongoose.connection;

function main () {
	_init_username()
		.then(() => console.log('username init success.'))
		.then(() => _init_login())
		.then(() => console.log('login init success.'))
		.then(() => _init_tag())
		.then(() => console.log('tag init success.'))
		.then(() => _init_task())
		.then(() => console.log('task init success.'))
		.then(() => console.log('db init success. finished.'));
}

main();

function _init_username() {
	return username.create({ username: "TH_Cloud" });
}

function _init_login() {
	var users = [
		{
			username: "user1",
			password: "123"
		},
		{
			username: "user2",
			password: "123"
		},
		{
			username: "user3",
			password: "123"
		} 
	];
	users.forEach((user) => {
		login.addUser(user, null);
	});	
	return p.resolve();
}

function _init_tag() {
	var tags = [
		{
			tagName: 'tag1'
		},
		{
			tagName: 'tag2'
		},
		{
			tagName: 'tag3'
		}
	];
	tags.forEach((obj) => {
		tag.addTag(obj);
	});
	return p.resolve();
}

function _init_task() {
	for (var i = 0; i < 12; i++) {
		var conditions = {};
		conditions.taskName = 'task' + (i+1);
		conditions.total = 4;
		conditions.current = 1;
		conditions.state = 'unfinished';
		conditions.reporters = [];
		conditions.tagName = 'tag' + parseInt(i/4+1);
		conditions.description = '这是' + 
								conditions.tagName + 
								'的task' + parseInt(i%4+1);
		conditions.statusName = [];
		for(var j = 1; j <= 4; j++) {
			conditions.statusName.push(conditions.taskName + '的状态' + j);
		}
		task.addTask(conditions, null);
	}

	return p.resolve();
}