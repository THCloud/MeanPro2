/**
 *  ./public/assets/js/controller/taskEditCtrl.js
 *
 *  @file    this controller is for task edit page.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('taskEditCtrl', [
		'$scope',
		'$timeout',
		'$http',
		'$route',
		'$location',
		'Pattern',
		function($scope, $timeout, $http, $route, $location, Pattern){
			$scope.pattern = Pattern;
			$scope.task = {
				taskName: "test一下试一试",
				total: 3,
				current: 1,
				state: "unfinished",
				statusName: ['先来一个', '再来一个'],
				reporters: [],
				tagName: "tag1",
				description: "在这里添加描述"
			};
			$scope.tags = [];

			$scope.addTask = function () {
				$http.post('/task', $scope.task)
					.then(function (res) {
						if (res.data.state == 'success') {
							alert('success');
							$location.path('/');
						} else {
							alert('failed');
						}
					}, function (res) {
						alert('network error.');
					});
			};

			$scope.updateTask = function () {
				$http.put('/task/edit/' + $route.current.params.id, $scope.task)
					.then(function (res) {
						if (res.data.state == 'success') {
							alert('success');
							$location.path('/task/' + $route.current.params.id);
						} else {
							alert('failed');
						}
					}, errorCallback);
			};

			$scope.range = function (num) {
				var temp = [];
				for(var i = 0; i < num; i++) {
					temp.push(i);
				}
				return temp;
			};

			function fetchTaskInfo() {
				$http.get('/task/edit/' + $route.current.params.id)
					.then(function (res) {
						$scope.task = res.data;
					}, errorCallback);
			}

			function fetchTags() {
				$http.get('/tag')
					.then(function (res) {
						$scope.tags = res.data;			
					}, errorCallback);
			}

			function errorCallback(res) {
				alert('network error');
			}

			function _init() {
				if ($scope.pattern == 'edit') {
					fetchTaskInfo();
				}
				fetchTags();
			}

			_init();
	}]);