/**
 *  ./public/assets/js/controller/layoutCtrl.js
 *
 *  @file    this controller is for layout, include nav and footer.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('layoutCtrl', [
		'$scope',
		'$rootScope',
		'$timeout',
		'$location',
		'$anchorScroll',
		'AuthService',
		'Session',
		function($scope, $rootScope, $timeout, $location, $anchorScroll, AuthService, Session) {
			$scope.currentUser = Session.username;
			$scope.currentRole = Session.userRole;
			$scope.userId = Session.userId;

			$scope.userLogin = function (credentials) {
				AuthService.userLogin(credentials)
						.then(function (data) {
							$rootScope.$broadcast('refresh');
						}, function (data) {
							// 这里做点错误提示，用个modal啥的
							console.log('login failed');
						});
			};

			$scope.goto = function (id) {
				$location.hash(id);	
				$anchorScroll();
			};

			$scope.logout = function () {
				AuthService.logout()
					.then(function () {
						refresh();
					});
			};

			$scope.$on('refresh', refresh);
			

			function refresh() {
				$scope.currentUser = Session.username;
				$scope.currentRole = Session.userRole;
				$scope.userId = Session.userId;
			}

	}]);