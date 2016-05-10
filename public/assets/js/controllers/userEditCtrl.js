/**
 *  ./public/assets/js/controller/userEditCtrl.js
 *
 *  @file    this controller is for index page.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('userEditCtrl', [
		'$scope',
		'$timeout',
		'$route',
		'$http',
		'Session',
		function($scope, $timeout, $route, $http, Session){
			$scope.username = '';
			$scope.userRole = Session.userRole;
			$scope.password = '';

			$scope.updatePassword = function () {
				var data = {
					password: $scope.password
				};
				$http.put('/login', data)
					.then(successCallback, errorCallback);
			};

			$scope.addUser = function () {
				var data = {
					username: $scope.username,
					password: $scope.password
				};
				$http.put('/admin/add', data)
					.then(successCallback, errorCallback);
			};

			function _init() {
				if (Session.userRole == 'normal') {
					$scope.username = Session.username;
				}
			}

			function successCallback(res) {
				if (res.data.state == 'success') {
					alert('success');
				} else {
					alert('failed');
				}
			}

			function errorCallback(res) {
				alert('network error.');
			}	

			_init();
	}]);