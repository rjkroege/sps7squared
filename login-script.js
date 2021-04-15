// Function used to initialize Firebase UI components (login with google)
function initializeFirebaseUI() {
  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Succesfull login
        // Make call to backend script
        chrome.runtime.sendMessage({ message: "sign_in" }, function (response) {
          if (response.message === "success") {
            window.location.replace("popup.html"); // Show main page to the user
          }
        });
        return false;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInOptions: [
      // Google login provider information
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          prompt: "select_account",
        },
      },
    ],
  };

  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);
}

initializeFirebaseUI();
