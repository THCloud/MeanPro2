/**
 *  ./public/assets/js/services/AuthService.js
 *
 *  @file     Include the Auth service.
 *
 *  @author   TH_Cloud
 *
 */

services.factory('AuthService', [
		'$http',
		'Session',
		function ($http, Session) {
			var authService = {};

			authService.adminLogin = function (credentials) {
				return $http.post('/admin', credentials)
							.then(function (res) {
								var data = res.data;
								Session.create(data._id, data.username, 'admin');
								return data;
							});
			};

			authService.userLogin = function (credentials) {
				return $http.post('/login', credentials)
							.then(function (res) {
								var data = res.data;
								Session.create(data._id, data.username, 'normal');
								return data;
							});
			};

			authService.isLogined = function () {
				return !!Session.username;
			};

			authService.isAdmin = function () {
				return Session.userRole == 'admin';
			};

			authService.logout = function () {
				return $http.get('/get')
							.then(function (data) {
								Session.destroy(); 
							});
			};

			return authService;
		}]);
