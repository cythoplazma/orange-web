'use strict';

/* Firebase base */
var fbRef = 'https://classifly.firebaseio.com';
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
  .controller('StartProjectCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.storeInFirebase = function() {
      var file = $('#data').get(0).files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onload = function(e) {
        var ref = new Firebase(fbRef + '/projects');
        var refId = ref.push(JSON.parse(e.target.result));
        $rootScope.user['project_owner'].set(refId);
        console.log($rootScope.user['project_owner'].get());
      }
      reader.readAsText(file);
    }
  }])
	.controller('UserCtrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
		// $scope.data = {};
		// Users.get(function(response) {
		// 	$scope.data.subdata = response;
		// });;
    console.log("on user page: "+$rootScope.user.uid);
    var ref = new Firebase(fbRef + '/users');
    ref.child($rootScope.user.uid).once('value', function(data) {
      console.log("on user page:"+data.child('dname').val());
      $scope.$apply(function() {
        $scope.dname=data.child('dname').val();
      });
    }, function(err) {
      console.log(err); 
    });

    $scope.changeUserData = function() {
      if ($scope.password0.length==0 || $scope.password1.length==0 || $scope.password2.length==0) {
        ref.child(user.uid+'/dname').set($scope.dname);
        $window.location.href='#';
      } else {
        if ($scope.password1 === $scope.password2) {
          $rootScope.authClient.changePassword($rootScope.user.email, $scope.password0, $scope.password1, function(err) {
            if (err) {
              console.log(err);
              $window.location.href='#/usercp';
            } else {
              console.log("SUCCESS! Password changed!");
              $window.location.href='#';
            }
          });
        }
      }
    }
	}])
	.controller('RegisterCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var ref = new Firebase(fbRef + '/users');
    $rootScope.authClient = FirebaseSimpleLogin(ref, function(error, user) {
      $rootScope.user = user;
      $rootScope.error = error;
      if (error) {
          // an error occurred while attempting login
        console.log($rootScope.error);
        $('p.status').text("Failure to login!");
      }
      else if ($rootScope.user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
        $('a.login-button').text("Logout");
        $('p.status').text("You're logged in now!");
        $rootScope.logout = function() {
          $rootScope.authClient.logout();
          $('a.logout-button').text("Login");
        }
        // make redirect with $window method
        // put user inside /users
        ref.child(user.uid).set({
          "dname": $scope.dname,
          "details_private": true,
          "organization": "",
          "project_owner": [],
          "project_participant": []
        });
      }
      else {
      // user is logged out
        $('a.login-button').text("Login");
        $('p.status').text("Logged out.");
      }
    });
    $scope.registerUser = function() {
      if ($scope.password === $scope.password2) {
        $rootScope.authClient.createUser($scope.email, $scope.password, function(error) {
          if (error) {
            console.log(error);
            $window.location.href='#/register';
          } else {
            $rootScope.authClient.login('password', {
              'email': $scope.email,
              'password': $scope.password,
              'rememberMe': false
            });
            $window.location.href='#';
          }
        });
      }
    }

	}])
  .controller('LoginCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    var ref = new Firebase('https://classifly.firebaseio.com');
    $rootScope.authClient = FirebaseSimpleLogin(ref, function(error, user) {
      $rootScope.user = user;
      $rootScope.error = error;
      if ($rootScope.error) {
          // an error occurred while attempting login
        console.log(error);
        $window.location.href='#/login';
        $('p.status').text("Failure to login!");
      }
      else if ($rootScope.user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
        $('p.status').text("You're logged in now!");
        $('a.login-button').text("Logout");
        $('li.register-button').hide();
        $window.location.href='#';
        $rootScope.logout = function() {
          $rootScope.authClient.logout();
          $('a.logout-button').text("Login");
          $window.location.href='#';
        }
      }
      else {
      // user is logged out
        $window.location.href='#';
        $('li.register-button').show();
        $('a.login-button').text("Login");
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
