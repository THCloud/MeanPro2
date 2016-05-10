/**
 *  ./public/assets/js/controller/adminCtrl.js
 *
 *  @file    this controller is for admin login page.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('adminCtrl', [
		'$scope',
		'$rootScope',
		'$timeout',
		'$location',
		'AuthService',
		function($scope, $rootScope, $timeout, $location, AuthService){
			$scope.adminLogin = function (credentials) {
				AuthService.adminLogin(credentials)
						.then(function (data) {
							$location.path('/main');
							$rootScope.$broadcast('refresh');							
						}, function (data) {
							alert('登录失败');
						});
			};
	}]);