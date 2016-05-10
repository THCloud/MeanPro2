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
                .when('/main', {
                    templateUrl: '/views/main.html',
                    controller: 'indexCtrl',
                })
                .when('/error', {
                    templateUrl: 'error.html',
                })
                .when('/admin', {
                    templateUrl: '/views/admin.html',
                    controller: 'adminCtrl'
                })
                .when('/about', {
                    templateUrl: 'about.html'
                })
                .when('/user/edit', {
                    templateUrl: '/views/userEdit.html',
                    controller: 'userEditCtrl'
                })
                .when('/user/edit/:id', {
                    templateUrl: '/views/userEdit.html',
                    controller: 'userEditCtrl'
                })
                .when('/tag/edit', {
                    templateUrl: '/views/tagEdit.html',
                    resolve: {
                        Pattern: [function () {
                            return 'add';
                        }]
                    },
                    controller: 'tagEditCtrl'
                })
                .when('/tag/edit/:id', {
                    templateUrl: '/views/tagEdit.html',
                    resolve: {
                        Pattern: [function () {
                            return 'edit';
                        }]
                    },
                    controller: 'tagEditCtrl'
                })
                .when('/task/edit', {
                    templateUrl: '/views/taskEdit.html',
                    resolve: {
                        Pattern: [function () {
                            return 'add';
                        }]
                    },
                    controller: 'taskEditCtrl'
                })
                .when('/task/edit/:id', {
                    templateUrl: '/views/taskEdit.html',
                    resolve: {
                        Pattern: [function () {
                            return 'edit';
                        }]
                    },
                    controller: 'taskEditCtrl'
                })
                .when('/task/:id', {
                    templateUrl: '/views/taskInfo.html',
                    controller: 'taskInfoCtrl'
                })
                .otherwise({
                    redirectTo: '/main'
                });
            $locationProvider.html5Mode(true);    
        }]);
