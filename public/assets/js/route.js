/**
 * public/assets/js/route.js
 *
 * @file   This used to control the FE route with angular.
 *         stateProvider may be better choice for a complex app.
 *
 * @author TH_Cloud
 *
 */


angular.module('myApp')
    .config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                // .when('/', {
                //     templateUrl: './public/index.html',
                //     controller: 'indexCtrl',
                // })
                // .when('/error', {
                //     templateUrl: './public/error.html',
                //     controller: 'errorCtrl',
                // })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode({
                enable: true,
                requireBase: false
            });
        }]);
