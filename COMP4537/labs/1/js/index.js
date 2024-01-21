import messages from "../lang/messages/en/user.js";

class Traverser {
    redirect(path) {
        window.location.href=path;
    }
}

// Startup
const traverser = new Traverser();

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("title").innerHTML = messages.TITLE;
    document.getElementById("header").innerHTML = messages.TITLE;
    document.getElementById("writer-btn").innerHTML = messages.WRITER_BTN;
    document.getElementById("reader-btn").innerHTML = messages.READER_BTN;
    document.getElementById("writer-btn").addEventListener("click", () => {
        traverser.redirect("writer.html");
    });
    document.getElementById("reader-btn").addEventListener("click", () => {
        traverser.redirect("reader.html");
    });
});
