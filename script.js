let btn = document.querySelector("#add-btn");
let container = document.querySelector("#container");

btn.addEventListener("click", function () {
  createNote();
});

function createNote(text = "") {
  let note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
      <textarea placeholder="Write your note..."></textarea>
      <button>❌</button>
  `;

  container.append(note);

  let textarea = note.querySelector("textarea");
  let deleteBtn = note.querySelector("button");

  textarea.value = text;
  textarea.focus();

  textarea.addEventListener("input", function () {
    saveNotes();
  });

  deleteBtn.addEventListener("click", function () {
    note.remove();
    saveNotes();
  });
}

function saveNotes() {
  let arr = [];

  let allTextAreas = document.querySelectorAll("textarea");

  allTextAreas.forEach(function (area) {
    arr.push(area.value);
  });

  localStorage.setItem(
    "notes",
    JSON.stringify(arr)
  );
}

function loadNotes() {
  let notes = JSON.parse(
    localStorage.getItem("notes")
  );

  if (!notes) {
    return;
  }

  notes.forEach(function (noteText) {
    createNote(noteText);
  });
}

loadNotes();