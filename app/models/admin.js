/**
 *  ./app/models/admin.js
 *
 *  @file     for the admin query.
 *
 *  @author   TH_Cloud
 *
 */

var Bourne = require('bourne');
var crypter = require('../crypt.js');
var path = require('path');

var db = new Bourne(path.join(__dirname, '../../config/admin.json'));


module.exports.queryAdmin = function(conditions, callback) {
	var query = {
		username: conditions.username,
		password: crypter.hash(conditions.password)
	};
	return db.findOne(query, callback);
};
