import messages from "../lang/messages/en/user.js";

class NoteManager {
    constructor() {
        this.noteArray = [];
    }

    add() {
        let currTime = Date.now();
        let note = {timestamp: currTime, content: ""};
        this.noteArray.push(note);
        if (localStorage.getItem('notes') == null) {
            localStorage.setItem('notes', JSON.stringify(this.noteArray));
        } else {
            let notes = JSON.parse(localStorage.getItem('notes'));
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
        this.updateStorageTime();
        this.updateNotes();
    }

    updateNotes() {
        let notesDiv = document.getElementById("notes");
        notesDiv.innerHTML = "";
        let notes = JSON.parse(localStorage.getItem('notes'));
        if (notes && notes.length > 0) {
            for (let i = 0; i < notes.length; i++) {
                let note = notes[i];
                let formatted = messages.NOTE_DIV(note.timestamp, note.content)
                console.log(formatted);
                notesDiv.innerHTML += formatted;
            }
            for (let i = 0; i < notes.length; i++) {
                this.attachRemoveEvent(notes[i].timestamp);
                this.attachUpdateEvent(notes[i].timestamp);
            }
        }
    }

    attachRemoveEvent(timestamp) {
        document.getElementById(`remove${timestamp}`).addEventListener("click", () => {
            let notes = JSON.parse(localStorage.getItem('notes'));
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].timestamp === timestamp) {
                    notes.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            this.updateStorageTime();
            this.updateNotes();
        });
    }

    attachUpdateEvent(timestamp) {
        document.getElementById(`note-ta-${timestamp}`).addEventListener("change", () => {
            let notes = JSON.parse(localStorage.getItem('notes'));
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].timestamp === timestamp) {
                    notes[i].content = document.getElementById(`note-ta-${timestamp}`).value;
                    break;
                }
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            this.updateStorageTime();
        });
    }

    updateStorageTime() {
        let currTime = Date(Date.now());
        document.getElementById("storage-time").innerHTML = messages.STORAGE_TIME + currTime;
        localStorage.setItem('lastStored', currTime);
    }
}

// Startup
const noteManager = new NoteManager();

document.addEventListener("DOMContentLoaded", () => {
    noteManager.updateNotes();
    if (localStorage.getItem('lastStored') !== null) {
        document.getElementById("storage-time").innerHTML = messages.STORAGE_TIME + localStorage.getItem('lastStored');
    }
    document.getElementById("title").innerHTML = messages.TITLE;
    document.getElementById("add-btn").addEventListener("click", () => {
        noteManager.add();
    });
    document.getElementById("back-btn").addEventListener("click", () => {
        location.href = "index.html";
    });
    document.getElementById("add-btn").innerHTML = messages.ADD_BTN;
    document.getElementById("back-btn").innerHTML = messages.BACK_BTN;
});

export default noteManager;