function login() {
  function newLoginHappened(user) {
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

  firebase.auth().onAuthStateChanged(newLoginHappened);
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

// Create a new note and render it.
function renderNote(doc){
  // Values retrieved from DB
  let id = doc.id;
  let noteText = doc.data().text;

  // Create new note 
  var container = document.getElementsByClassName("notes-container");
  var temp = document.querySelector("#note");
  var clone = temp.content.cloneNode(true);
  var div = clone.querySelector(".text");

  // Modify new note values
  div.textContent = noteText;
  temp.setAttribute('data-id', id);

  // Add new note to notes container
  container[0].prepend(clone);
}

// Get firebase data based on URL.
function getDataFromDB(URL){
  db.collection('notes')
  .where("URL", "==", URL)
  .get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
          renderNote(doc);
      })
  })
}

// Display data from current page.
function displayCurrentURLData() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url; // This is user's current page URL

    // Get data from DB based on current URL
    getDataFromDB(url); 
});
}

// Push a note to the database.
function saveDataToDB(noteText){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Push data to DB
        db.collection('notes').add({
          URL: url,
          author: user.displayName,
          text: noteText
        });
      } 
    });
});
} 
