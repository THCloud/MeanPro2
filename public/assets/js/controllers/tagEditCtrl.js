/**
 *  ./public/assets/js/controller/tagEditCtrl.js
 *
 *  @file    this controller is for index page.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('tagEditCtrl', [
		'$scope',
		'$timeout',
		'$location',
		'$route',
		'Pattern',
		function($scope, $timeout, $location, $route, Pattern) {
			$scope.tag = {
				tagName: ''
			};
			$scope.pattern = Pattern;

			$scope.addTag = function () {
				$http.post('/tag', $scope.tag)
					.then(successCallback, errorCallback);
			};

			$scope.updateTag = function () {
				$http.put('/tag/' + $route.current.params.id, $scope.tag)
					.then(successCallback, errorCallback);
			};

			$scope.deleteTag = function () {
				$http.delete('/tag/' + $route.current.params.id)
					.then(successCallback, errorCallback);
			};

			function fetchTag() {
				$http.get('/tag/' + $route.current.params.id)
					.then(function (res) {
						if (res.data.errInfo) {
							alert('failed');
						} else {
							$scope.tag = res.data;
						}
					}, errorCallback);
			}

			function successCallback(res) {
				if (res.data.state == 'success') {
					alert('success');
				} else {
					alert('failed');
				}
			}

			function errorCallback(res) {
				alert('network error');
			}

			function _init() {
				if ($scope.pattern == 'edit') {
					fetchTag();
				}
			}

			_init();

	}]);