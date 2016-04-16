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
		'$timeout',
		'$location',
		'$anchorScroll',
		function($scope, $timeout, $location, $anchorScroll){
			$scope.goto = function(id) {
				$location.hash(id);	
				$anchorScroll();
			};
	}]);