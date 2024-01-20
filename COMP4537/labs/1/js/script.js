import messages from "../lang/messages/en/user.js";

class Note {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
}

class NoteManager {
    constructor() {
        this.noteArray = [];
        this.idAssigned = 0;
        // Necessary in order to give local storage variables unique names.
        this.incrementId = () => {
            this.idAssigned++;
        }
    }

    add(content) {
        localStorage.setItem(this.idAssigned, content);
        this.noteArray.push(new Note(this.idAssigned, content));
        this.incrementId();
        this.updateStorageTime();
        this.displayNotes();
    }

    remove(row, id, i) {
        document.getElementById(row).remove();
        localStorage.removeItem(id);
        this.noteArray.splice(i, 1);
        this.displayNotes();
    }

    displayNotes() {
        let notes = document.getElementById("notes");
        notes.innerHTML = "";
        for (let i = 0; i < this.noteArray.length; i++) {
            let note = this.noteArray[i];
            // TODO: Obscure the note content.
            notes.innerHTML += `<div id='note-row-${i}'> <textarea>${note.content}</textarea> <button id='remove${note.id}'>Remove</button> </div>`;
        }
        this.attachRemoveEvent();
    }

    attachRemoveEvent() {
        for (let i = 0; i < this.noteArray.length; i++) {
            let note = this.noteArray[i];
            document.getElementById(`remove${note.id}`).addEventListener("click", () => {
                this.remove(`note-row-${i}`, note.id, i);
            });
        }
    }
    
    updateStorageTime() {
        document.getElementById("storage-time").innerHTML = messages.STORAGE_TIME + new Date().toLocaleString();
    }
}

const noteManager = new NoteManager();
document.getElementById("title").innerHTML = messages.TITLE;
document.getElementById("submit-btn").addEventListener("click", () => {
    let content = document.getElementById("new-note").value;
    noteManager.add(content);
});