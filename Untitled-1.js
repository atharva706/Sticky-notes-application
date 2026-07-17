let btn = document.querySelector("button");
let container = document.querySelector("#container");

btn.addEventListener("click", function () {
    createNote();
});

// LOAD NOTES
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(function (note) {
        createNote(note.text, note.left, note.top);
    });
}

// SAVE NOTES
function saveNotes() {
    let arr = [];

    document.querySelectorAll(".note").forEach(function (note) {
        let textarea = note.querySelector("textarea");

        arr.push({
            text: textarea.value,
            left: note.style.left,
            top: note.style.top
        });
    });

    localStorage.setItem("notes", JSON.stringify(arr));
}

// CREATE NOTE
function createNote(
    text = "",
    left = "100px",
    top = "100px"
) {
    let note = document.createElement("div");
    note.classList.add("note");

    note.style.position = "absolute";
    note.style.left = left;
    note.style.top = top;

    note.innerHTML = `
        <textarea placeholder="ADD NOTE"></textarea>
        <button>❌</button>
    `;

    container.append(note);

    let textarea = note.querySelector("textarea");
    textarea.value = text;

    textarea.addEventListener("input", saveNotes);

    let deleteBtn = note.querySelector("button");

    deleteBtn.addEventListener("click", function () {
        note.remove();
        saveNotes();
    });

    // Save new note immediately
    saveNotes();
}

loadNotes();