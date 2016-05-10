/**
 *  ./public/assets/js/services/Session.js
 *
 *  @file     Include the Session service.
 *
 *  @author   TH_Cloud
 *
 */

services.service('Session', function () {
	this.create = function (userId, username, userRole) {
		this.userId = userId;
		this.username = username;
		this.userRole = userRole;
	};
	this.destroy = function () {
		this.userId = null;
		this.username = null;
		this.userRole = null;
	};
	return this;
});