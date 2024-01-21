// Startup
const noteManager = new NoteManager();

document.addEventListener("DOMContentLoaded", () => {
    noteManager.updateNotes();
    if (localStorage.getItem('lastStored') !== null) {
        document.getElementById("storage-time").innerHTML = messages.STORAGE_TIME + localStorage.getItem('lastStored');
    }
    document.getElementById("title").innerHTML = messages.TITLE;
    document.getElementById("submit-btn").addEventListener("click", () => {
        let content = document.getElementById("new-note").value;
        noteManager.add(content);
        // Clears the input field after submission.
        document.getElementById("new-note").value = "";
    });
    document.getElementById("back-btn").addEventListener("click", () => {
        location.href = "index.html";
    });
    document.getElementById("submit-btn").innerHTML = messages.SUBMIT_BTN;
    document.getElementById("back-btn").innerHTML = messages.BACK_BTN;
});

export default noteManager;