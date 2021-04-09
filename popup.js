window.onload = function () {
    /* GLOBAL VARIABLES: form, add, submit, and text grabbed from submission of the form. */
    var noteForm = document.getElementById("noteForm");
    var plusNote = document.getElementById("add");
    var submitNote = document.getElementById("submit");
    var text = "";

    /* Creates a form that allows for the user to input text to later be used in a note. */
    plusNote.onclick = function writeNote() {
        noteForm.classList.toggle("show");
        noteForm.reset();

        if (!plusNote.classList.contains("bi-x-circle")) {
            plusNote.classList.add("bi-x-circle");
            plusNote.classList.remove("bi-plus-circle");
        }
        else {
            plusNote.classList.remove("bi-x-circle");
            plusNote.classList.add("bi-plus-circle");
        }
    };

    /* Creates an instance of a note using the text submission from noteForm. Prevents the deafult action of form submission in order to grab contents of the textarea. */
    submitNote.onclick = function addNote(ev) {
        ev.preventDefault(); //stop the form submitting

        let note = {
            text: document.getElementById("text").value
        }
        text = note.text;

        noteForm.reset();

        noteForm.classList.remove("show");

        var newNote = document.createElement('div');
        newNote.setAttribute("class", "note");

        /* Adds in the inner html that is basically the note. CSS takes these elements into account. Text variable holds the text from the above function that creates an instance of a note */
        newNote.innerHTML = "<div class='text'>" + text + "</div><div class='edits-container'><i id='edit' class='bi bi-pencil'></i><i id='delete' class='bi bi-trash'></i></div>";

        /* appends child (newNote) to the top */
        var container = document.getElementsByClassName("notes-container");
        container[0].prepend(newNote);

        /* Takes care of consistency in the plus vs x button for creating/cancelling a note */
        if (plusNote.classList.contains("bi-x-circle")) {
            plusNote.classList.remove("bi-x-circle");
            plusNote.classList.add("bi-plus-circle");
        }
    }
};
