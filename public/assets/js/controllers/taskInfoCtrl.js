/**
 *  ./public/assets/js/controller/taskInfoCtrl.js
 *
 *  @file    this controller is for taskInfo page.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('taskInfoCtrl', [
		'$scope',
		'$http',
		'Session',
		'$route',
		'$location',
		'$timeout',
		function($scope, $http, Session, $route, $location, $timeout){
			$scope.task = {};
			$scope.userRole = Session.userRole;
			var path = "/task/edit/" + $route.current.params.id;

			$scope.pushTask = function () {
				$http.post(path, {})
					.then(function (res) {
						alert('success');
						console.log(res);
						$scope.task = res.data;
					}, errorCallback);
			};

			$scope.deleteTask = function () {
				$http.delete(path)
					.then(function (res) {
						alert('success');
						$location.path('/main');
					}, errorCallback);				
			};

			$scope.editTask = function () {
				$location.path('/task/edit/' + $route.current.params.id);
			};

			function fetchTaskInfo() {	
				$http.get(path)
					.then(function (res) {
						$scope.task = res.data;
					}, errorCallback);
			}

			function errorCallback(res) {
				alert('network failed.');
			}

			function _init() { 
				fetchTaskInfo();
				console.log("fetched with taskInfo Ctrl");
			}

			_init();
		
		}]);