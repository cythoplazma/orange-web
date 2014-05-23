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
	}])
	.controller('RegisterCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var ref = new Firebase('https://classifly.firebaseio.com');
    $rootScope.authClient = FirebaseSimpleLogin(ref, function(error, user) {
      $rootScope.user = user;
      if (error) {
          // an error occurred while attempting login
        console.log(error);
        $('p.status').text("Failure to login!");
      }
      else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
        $('p.status').text("You're logged in now!");
      }
      else {
      // user is logged out
        $('p.status').text("Logged out.");
      }
    });
    $scope.registerUser = function() {
      if ($scope.password === $scope.password2) {
        $rootScope.authClient.createUser($scope.email, $scope.password, function(error) {
          if (error) {
            console.log(error);
          }
        });
        $rootScope.authClient.login('password', {
          'email': $scope.email,
          'password': $scope.password,
          'rememberMe': false
        });
      }
    }

	}])
  .controller('LoginCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var ref = new Firebase('https://classifly.firebaseio.com');
    $rootScope.authClient = FirebaseSimpleLogin(ref, function(error, user) {
      $rootScope.user = user;
      if (error) {
          // an error occurred while attempting login
        console.log(error);
        $('p.status').text("Failure to login!");
      }
      else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
        $('p.status').text("You're logged in now!");
        $rootScope.logout = function() {
          console.log("zavpij!");
          $rootScope.authClient.logout();
        }
      }
      else {
      // user is logged out
        $('p.status').text("Logged out.");
      }
    });

    $scope.loginUser = function() {
      $rootScope.authClient.login('password', {
        'email': $scope.email,
        'password': $scope.password,
        'rememberMe': $scope.checked,
      });
    }

  }]);
