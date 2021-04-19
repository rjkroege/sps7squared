function login() {
  function newLoginHappened(user) {
    if (user) {
      //User is signed in
      app(user);
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          chrome.runtime.sendMessage(
            { message: "sign_in" },
            function (response) {
              if (response.message === "success") {
                window.location.replace("popup.html");
              }
            }
          );
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
  }

  firebase.auth().onAuthStateChanged(newLoginHappened);
}

function app(user) {
  alert("Hello, " + user.displayName);
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function makeFirebaseConfig() {
  return {
    apiKey: config().apiKey,
    authDomain: config().authDomain,
    projectId: config().projectId,
    storageBucket: config().storageBucket,
    messagingSenderId: config().messagingSenderId,
    appId: config().appId,
    measurementId: config().measurementId,
  };
}

function getProfileURL() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      document
        .getElementById("profile-image")
        .setAttribute("src", user.photoURL);
    } else {
      // User not logged in or has just logged out.
    }
  });
}
