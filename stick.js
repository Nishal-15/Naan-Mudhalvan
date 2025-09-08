const board = document.getElementById("board");
const addNoteBtn = document.getElementById("addNote");

let zIndexCounter = 1;

addNoteBtn.addEventListener("click", createNote);

function createNote() {
  const note = document.createElement("div");
  note.className = "note";
  note.style.top = Math.random() * 60 + "vh";
  note.style.left = Math.random() * 70 + "vw";
  note.style.zIndex = zIndexCounter++;

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Write something...";

  const del = document.createElement("button");
  del.className = "delete";
  del.innerText = "✖";
  del.onclick = () => board.removeChild(note);

  note.appendChild(del);
  note.appendChild(textarea);
  board.appendChild(note);

  makeDraggable(note);
}


function makeDraggable(note) {
  let offsetX, offsetY, isDragging = false;

  note.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "TEXTAREA" || e.target.className === "delete") return;
    isDragging = true;
    offsetX = e.clientX - note.offsetLeft;
    offsetY = e.clientY - note.offsetTop;
    note.style.zIndex = zIndexCounter++;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    note.style.left = e.clientX - offsetX + "px";
    note.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}
