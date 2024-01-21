import messages from "../lang/messages/en/user.js";

class NoteReader {
    constructor() {
        setInterval(() => {
            let updateTime = Date(Date.now());
            document.getElementById("last-update").innerHTML = messages.UPDATE_TIME + updateTime;
            this.read();
        }, 2000)
    }

    read() {
        let notesDiv = document.getElementById("notes");
        notesDiv.innerHTML = "";
        let notes = JSON.parse(localStorage.getItem('notes'));
        if (notes && notes.length > 0) {
            for (let i = 0; i < notes.length; i++) {
                let note = notes[i];
                let formatted = messages.NOTE_DIV_NO_REMOVE(note.timestamp, note.content)
                console.log(formatted);
                notesDiv.innerHTML += formatted;
            }
        }
    }
}

// Startup
const noteReader = new NoteReader();

document.addEventListener("DOMContentLoaded", () => {
    noteReader.read();
    document.getElementById("title").innerHTML = messages.TITLE;
    document.getElementById("back-btn").addEventListener("click", () => {
        location.href = "index.html";
    });
    document.getElementById("back-btn").innerHTML = messages.BACK_BTN;
});