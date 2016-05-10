/**
 *  ./public/assets/js/controller/indexCtrl.js
 *
 *  @file    this controller is for index page.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('indexCtrl', [
		'$scope',
		'$http',
		'AuthService',
		'$timeout',
		function($scope, $http, AuthService, $timeout){
			$scope.tasks = [];
			$scope.tags = [];
			$scope.redirectAble = AuthService.isLogined();

			$scope.toggleTag = function (tag) {
				if (tag) {
					$http.get('/task/' + tag.tagName)
						.then(function (res) {
							$scope.tasks = res.data;
						}, function (res) {	
							alert('network error. toggle tag failed.');
						});					
				} else {
					fetchTasks();
				}
			};

			$scope.togglePage = function (pageNum) {

			};
			
			$scope.$on('refresh', function () {
				$scope.redirectAble = AuthService.isLogined();
			});

			function fetchTasks() {
				$http.get('/task')
					.then(function (res) {
						$scope.tasks = res.data;
					}, function (res) {
						alert('network error. get tasks failed.');
					});
			}

			function fetchTags() {
				$http.get('/tag')
					.then(function (res) {
						$scope.tags = res.data;			
					}, function (res) {	
						alert('network error. fetch tag failed');
					});
			}

			function _init() {
				fetchTasks();
				fetchTags();
			}
			
			_init();

	}]);