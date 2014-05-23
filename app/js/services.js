'use strict';

/* Services */
angular.module('myApp.services', ['ngResource','firebase'])
	// .value('version', '0.1')
	.factory('Data', ['$resource', function($resource) {
		return $resource('data/:dataId.json', {}, {
			// query: {method:'GET', params:{dataId:'data'}, isArray:true}
			get: {method:"GET", params: {dataId:"data"}, isArray: true}
		})
	}])
	.factory('Projects', ['$resource', function($resource) {
		return $resource('data/:dataId.json', {}, {
			// query: {method:'GET', params:{dataId:'data'}, isArray:true}
			get: {method:"GET", params: {dataId:"projects"}, isArray: true}
		})
	}])
	.factory('Users', ['$resource', function($resource) {
		return $resource('data/:dataId.json', {}, {
			// query: {method:'GET', params:{dataId:'data'}, isArray:true}
			get: {method:"GET", params: {dataId:"users"}, isArray: true}
		})
	}])
	.factory('AuthClient', ["$firebase", function($firebase) {
		var ref = new Firebase('https://classifly.firebaseio.com');
		return new FirebaseSimpleLogin(ref, function(error, user) {
			if (error) {
		    	// an error occurred while attempting login
				console.log(error);
				$scope.errormsg = "Failure to login!"
				}
			else if (user) {
				// user authenticated with Firebase
				console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
				$scope.errormsg = "Success!"
			}
			else {
			// user is logged out
				$scope.errormsg = "Logged out"
			}
			return;
		});
	}]);
