'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('CoreCtrl', ['$scope', 'Data', function($scope, Data) {
  	$scope.data = {};
  	Data.get(function(response) {
  		$scope.data.subdata = response;
  	});
  }])
  .controller('ProjectCtrl', ['$scope', 'Projects', function($scope, Projects) {
  	$scope.data = {};
  	Projects.get(function(response) {
  		$scope.data.subdata = response;
  	});
  }])
  .controller('UserCtrl', ['$scope', 'Users', function($scope, Users) {
  	$scope.data = {};
  	Users.get(function(response) {
  		$scope.data.subdata = response;
  	});
  }]);
