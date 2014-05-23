$(document).ready(function() {
  console.log("Started!");
  var ref = new Firebase('https://classifly.firebaseio.com');
  var AUTH_TOKEN = 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJhZG1pbiI6IHRydWUsICJpYXQiOiAxNDAwNjU3ODc4LCAiZCI6IHsiYXV0aF9kYXRhIjogImZvYXNkZmFzZGFzZG8iLCAib3RoZXJfYXV0aF9kYXRhIjogImJzZGZhc2Rhc2RhciJ9LCAidiI6IDB9.J_dwsFi2agwcYoZg0jaXizVDn7o4iHTbkQTjyoR6aZU';
  ref.auth(AUTH_TOKEN, function(error, result) {
    if (error) {
      console.log("Login Failed!", error);
    }
    else {
      console.log('Authenticated successfully with payload:', result.auth);
      console.log('Auth expires at:', new Date(result.expires * 1000));
    }
  });

  // Firebase login
  // var authClient = $firebaseSimpleLogin(ref);
  var authClient = new FirebaseSimpleLogin(ref, function(error, user) {  
    if (error) {
      console.log(error);
      return;
    }
    if (user) {
      console.log(user + " is logged in.");
    }
    else {
      console.log("user is loged out.");
    }
  });

  $('#submit').click(function(authClient) {
    console.log("I clicked it!");
    var email = $('#email').val();
    var user = $('#user').val();
    var password = $('#password').val();
    authClient.createUser(email, password, function(error, user) {
      console.log('User Id: ' + user.uid + ', Email: ' + user.email);
      if (error) {
        console.log(error);
        return;
      }
    });
  });
});
