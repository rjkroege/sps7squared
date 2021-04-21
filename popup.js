window.onload = function () {

    /* GLOBAL VARIABLES: login, logout, form, add, submit, and text grabbed from submission
     * of the form. Held in a global class for accessibility and holding global state */

    class Global {
        constructor() {
            this.login = document.getElementById("loginButton");
            this.logout = document.getElementById("logoutButton");

            this.noteForm = document.getElementById("noteForm");
            this.plusNote = document.getElementById("add");
            this.submitNote = document.getElementById("submit");
            this.text = "";
        }
    }

    var global = new Global();

    /* SIGN IN WITH GOOGLE */

    global.login.onclick = function login() {
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

    global.logout.onclick = function logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                chrome.runtime.sendMessage({ message: "sign_out" }, function (responese) {
                    if (responese.message === "success") {
                      window.location.replace("login.html");
                    }
                  });
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    }


    /* AFTER SIGN IN */

    /* Creates a form that allows for the user to input text to later be used in a note. */

    global.plusNote.onclick = function writeNote() {
        global.noteForm.classList.toggle("show");
        global.noteForm.reset();

        if (!global.plusNote.classList.contains("bi-x-circle")) {
            global.plusNote.classList.add("bi-x-circle");
            global.plusNote.classList.remove("bi-plus-circle");
        } else {
            global.plusNote.classList.remove("bi-x-circle");
            global.plusNote.classList.add("bi-plus-circle");
        }
    };

    /* Creates an instance of a note using the text submission from noteForm. Prevents the 
     * default action of form submission in order to grab contents of the textarea. */

    global.submitNote.onclick = function addNote(ev) {

        // Stop the form submitting.

        ev.preventDefault();

        let note = {
            text: document.getElementById("text").value,
        };
        global.text = note.text;

        global.noteForm.reset();
        global.noteForm.classList.remove("show");

        // Adds in the text content that is in the note. CSS takes these elements into 
        // account. Text variable holds the text from the above function that copies an
        // instance of a note from the HTML template.

        var temp = document.querySelector("#note");
        var clone = temp.content.cloneNode(true);
        var div = clone.querySelector(".text");
        div.textContent = global.text;

        // Appends child (clone of note template) to the top.

        var container = document.getElementsByClassName("notes-container");
        container[0].prepend(clone);

        // Takes care of consistency in the plus vs x button for creating/cancelling a note.

        if (global.plusNote.classList.contains("bi-x-circle")) {
            global.plusNote.classList.remove("bi-x-circle");
            global.plusNote.classList.add("bi-plus-circle");
        }
    };
    // Get users profile image URL
    getProfileURL();
    
    // Get data from DB based on a URL
    getDataFromDB("https://medium.com/"); // TODO: Get URL from current open tab
};
