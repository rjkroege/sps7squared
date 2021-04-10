window.onload = function () {
    
    /* GLOBAL VARIABLES: form, add, submit, and text grabbed from submission of the form.
     * Held in a global class for accessibility and holding global state */

    class Global {
        constructor() {
            this.noteForm = document.getElementById("noteForm");
            this.plusNote = document.getElementById("add");
            this.submitNote = document.getElementById("submit");
            this.text = "";
        }
    }

    var global = new Global();

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

        //Stop the form submitting.

        ev.preventDefault();

        let note = {
            text: document.getElementById("text").value,
        };
        global.text = note.text;
        
        global.noteForm.reset();
        global.noteForm.classList.remove("show");

        var newNote = document.createElement("div");
        newNote.setAttribute("class", "note");

        //Adds in the inner html that is basically the note. CSS takes these elements into 
        //account. Text variable holds the text from the above function that creates an
        //instance of a note.

        newNote.innerHTML =
            "<div class='text'>" +
            global.text +
            "</div><div class='edits-container'><i id='edit' class='bi bi-pencil'></i><i id='delete' class='bi bi-trash'></i></div>";

        //Appends child (newNote) to the top.

        var container = document.getElementsByClassName("notes-container");
        container[0].prepend(newNote);

        //Takes care of consistency in the plus vs x button for creating/cancelling a note.

        if (global.plusNote.classList.contains("bi-x-circle")) {
            global.plusNote.classList.remove("bi-x-circle");
            global.plusNote.classList.add("bi-plus-circle");
        }
    };
};
