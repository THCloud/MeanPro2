/**
 *  ./app/crypt.js
 *  
 *  @file     this is the crypt method of password
 *	
 *  @author   TH_Cloud
 *
 */



var crypter = require('crypto');

module.exports.hash = function (password) {
	return crypter.createHash('sha256').update(password).digest('hex');
};