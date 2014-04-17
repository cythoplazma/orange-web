'use strict';

/* Services */
angular.module('myApp.services', ['ngResource'])
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
	}]);
