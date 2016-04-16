/**
 *  ./public/assets/js/controller/errorCtrl.js
 *
 *  @file    this controller is for error page.
 *
 *  @author  TH_Cloud
 *	
 */


myApp.controller('errorCtrl', [
		'$scope',
		'$timeout',
		'$http',
		function($scope, $timeout, $http){
			$scope.send = ajaxReq;

			function ajaxReq() {
				var data = {
					id: 1,
					text: 'Fenrisulfr'
				};
				$http.post('/error', data)
					.then(function successCB(res) {
						console.log(res.data);
					}, function errorCB(res) {
						console.log(res.data);
					});
			}		

	}]);