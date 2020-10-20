var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '849911634904-h9gtp4id4vqi8fbk94aju4on4mqf4jqa.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('googleSignInBtn'));        
    });
}

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
           
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
    auth2.isSignedIn.listen(signinChanged);      
}

var signinChanged = function (val) {
  console.log('Signin state changed to ', val);
  if (auth2.isSignedIn.get()){
    var profile = auth2.currentUser.get().getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    document.getElementById('dropdownLogoutMenu1').innerHTML= auth2.currentUser.get().getBasicProfile().getName();
    document.getElementById('dropdownLoginLI').style.display = 'none';
    document.getElementById('dropdownLogoutLI').style.display = 'block';

  }else{
    console.log('Not signed in.');
    document.getElementById('dropdownLogoutLI').style.display = 'none';
    document.getElementById('dropdownLoginLI').style.display = 'block';
  }
}

function signOut() {
    console.log("Logout");
    if (auth2.isSignedIn.get())
      auth2.disconnect();

}
