'use strict';

/* Firebase base */
var fbRef = 'https://classifly.firebaseio.com';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('CoreCtrl', ['$scope', '$routeParams', '$rootScope', '$window', function($scope, $routeParams, $rootScope, $window) {
	 //  $scope.data = {};
		// Data.get(function(response) {
		// 	$scope.data.subdata = response;
		// });
    var ref = new Firebase(fbRef + '/projects');
    ref.child($routeParams.projectId).once('value', function(data) {
      $scope.$apply(function() {
        $scope.project = data.val();
        $scope.tag = function(key) {
          ref.child($routeParams.projectId+'/participants').push($rootScope.user.uid);
        }
      });
    }, function(err) {
      console.log(err); 
    });

    $scope.setTags = function(key,tag) {
      ref.child($routeParams.projectId + '/data/data').child(key + '/grades').once('value', function(data) {
        $scope.$apply(function() {
          var tags = data.val();
          console.log(tags);
          var usr = $rootScope.user.uid;
          if (usr in tags) {
            var idx = tags[usr].indexOf(tag);
            if (idx == -1) tags[usr].push(tag);
            else tags[usr].splice(idx,1);
            ref.child($routeParams.projectId + '/data/data').child(key + '/grades/' + usr).set(tags[usr]);
          }
          else {
            var newtags = [];
            newtags.push(tag);
            ref.child($routeParams.projectId + '/data/data').child(key + '/grades/' + usr).set(newtags);
          } 
          
        });
      }, function(err) {
        console.log(err); 
      });
    }
	}])
	.controller('ProjectCtrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
		// $scope.data = {};
		// Projects.get(function(response) {
		// 	$scope.data.subdata = response;
		// });
    var ref = new Firebase(fbRef + '/projects');
    ref.once('value', function(data) {
      $scope.$apply(function() {
        var alldata = data.val();
        $scope.projects = alldata;
        $scope.isParticipant = function(part) {
          if ($rootScope.user) {
            for (var id in part) {
              if(part[id] === $rootScope.user.uid) return true;
            }
            return false;
          }
          else return false;
        }
        $scope.addUserToProject = function(proj) {
          ref.child(proj+'/participants').push($rootScope.user.uid);
        }
      });
    }, function(err) {
      console.log(err); 
    });
	}])
  .controller('ProjectDetailsCtrl', ['$scope', '$rootScope', '$routeParams', '$window', function($scope, $rootScope, $routeParams, $window) {
    // $scope.data = {};
    // Projects.get(function(response) {
    //  $scope.data.subdata = response;
    // });
    $scope.projectId = $routeParams.projectId;
    var ref = new Firebase(fbRef + '/projects');
    ref.child($routeParams.projectId).once('value', function(data) {
      $scope.$apply(function() {
        var alldata = data.val();
        $scope.project = alldata;
        function isParticipant(part) {
          if ($rootScope.user) {
            for (var id in part) {
              if(part[id] === $rootScope.user.uid) return true;
            }
            return false;
          }
          else return false;
        }
        $scope.addUserToProject = function() {
          ref.child($routeParams.projectId+'/participants').push($rootScope.user.uid);
        }
        $scope.part = isParticipant(alldata.participants);
      });
    }, function(err) {
      console.log(err); 
    });
  }])
  .controller('StartProjectCtrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
    $scope.storeInFirebase = function() {
      var file = $('#data').get(0).files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var ref1 = new Firebase(fbRef + '/projects');
        var newRef = ref1.push({
          'title': $scope.title,
          'summary': $scope.summary,
          'description': $scope.description,
          'data': JSON.parse(e.target.result),
          'tags': $scope.tags.split(','),
          'passes': $scope.passes,
          'help': $scope.help,
          'participants': [ $rootScope.user.uid ],
        });
        var newId = newRef.name();
        var ref2 = new Firebase(fbRef + '/users/' + $rootScope.user.uid);
        ref2.child('started').push(newId);
        ref2.child('participates').push(newId);
        ref2.child('started').once('value', function(data) {
          var started = data.val();
          ref2.child('started').set(started);
        }, function(err) {
          console.log(err); 
        });
        ref2.child('participates').once('value', function(data) {
          var participates = data.val();
          ref2.child('participates').set(participates);
        }, function(err) {
          console.log(err); 
        });
      }
      reader.readAsText(file);
      $window.location.href='#';
    }
  }])
	.controller('UserCtrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
		// $scope.data = {};
		// Users.get(function(response) {
		// 	$scope.data.subdata = response;
		// });;
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
      if ($scope.password0 === undefined || $scope.password1 === undefined || $scope.password2 === undefined || $scope.password0.length==0 || $scope.password1.length==0 || $scope.password2.length==0) {
        ref.child($rootScope.user.uid + '/dname').set($scope.dname);
        $window.location.href='#';
      } else {
        ref.child($rootScope.user.uid + '/dname').set($scope.dname);
        if ($scope.password1 === $scope.password2) {
          $rootScope.authClient.changePassword($rootScope.user.email, $scope.password0, $scope.password1, function(err) {
            if (err) {
              console.log(err);
              $window.location.href='#/usercp';
            } else {
              // SUCCESS! Password changed!
              $window.location.href='#';
            }
          });
        } else {
          // Passwords don't match!
          $window.location.href='#/settings';
        }
      }
    }
	}])
	.controller('RegisterCtrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
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
        console.log('User ID: ' + $rootScope.user.uid + ', Provider: ' + $rootScope.user.provider);
        // $('a.logout-button').text("Logout");
        $('p.status').text("You're logged in now!");
        $('a.login-button').text("Logout");
        $('li.register-button').hide();
        $rootScope.logout = function() {
          $rootScope.authClient.logout();
          $('a.login-button').text("Login");
          $window.location.href='#';
        }
        ref.child(user.uid).set({
          "dname": $scope.dname,
          "started": ['init'],
          "participates": ['init'],
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
              'rememberMe': false,
            });
            $window.location.href='#';
          }
        });
      }
    }

	}])
  .controller('LoginCtrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
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
        console.log('User ID: ' + $rootScope.user.uid);
        $('p.status').text("You're logged in now!");
        $('a.login-button').text("Logout");
        $('li.register-button').hide();
        $window.location.href='#';
        $rootScope.logout = function() {
          $rootScope.authClient.logout();
          $('a.login-button').text("Login");
          $window.location.href='#';
        }
      }
      else {
        // user is logged out
        $('li.register-button').show();
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
