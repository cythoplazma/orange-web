'use strict';

/* Main app */
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  // 'myApp.services',
  'myApp.animations',
  'myApp.controllers',
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homepage', {templateUrl: 'partials/homepage.html', controller: 'ProjectCtrl'});
	$routeProvider.when('/project/:projectId', {templateUrl: 'partials/core.html', controller: 'CoreCtrl'});
	$routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'RegisterCtrl'});
	$routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
	$routeProvider.when('/start-project', {templateUrl: 'partials/start-project.html', controller: 'StartProjectCtrl'});
	$routeProvider.when('/project-details/:projectId', {templateUrl: 'partials/project-details.html', controller: 'ProjectDetailsCtrl'});
	$routeProvider.when('/usercp', {templateUrl: 'partials/usercp.html', controller: 'UserCtrl'});
	$routeProvider.otherwise({redirectTo: '/homepage'});
}]);
