/**
 *  ./app/model/username.js
 *
 *  @file   Related with username table
 *          This may not expose to outside. So don't create any api more.
 *
 *  @author TH_Cloud
 */

var mongoose = require('mongoose');

var P = mongoose.Promise = require('bluebird');

var usernameSchema = mongoose.Schema({
	username: {
		type: String,
		require: true
	}
});

var username = module.exports = mongoose.model('username', usernameSchema);


