const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all notes from the db
function getNotes() {

  const notes = $.get("/api/notes", function(data) {
    // console.log(data)
  }).data

  return notes
};

// A function for saving a note to the db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// A function for deleting a note from the db
function deleteNote(id) {
  return $.ajax({
    url: "/api/notes/" + id,
    method: "DELETE",
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = () => {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};



// Get the note data from the inputs, save it to the db and update the view
async function handleNoteSave() {

  // GENERATE  ID
  let notes;
  
  await $.get("/api/notes", function(data) {
    notes = data
  });

  console.log(notes.length)
  // if no notes, give id 1
  let id = 1;
  if (notes.length !== 0) {
    id = parseInt(notes[notes.length - 1].id) + 1
  }
  

  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
    // PAss ID
    id: id
  };

  console.log(newNote)

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  console.log(note)

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });

};

// Sets the activeNote and displays it
const handleNoteView = function () {
  activeNote = $(this).data(); 
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Renders the list of note titles
async function renderNoteList() {

  // fetch notes
  let notes;
  await $.get("/api/notes", function(data) {
    notes = data
  });

  $noteList.empty();

  const noteListItems = [];

  // Returns jquery object for li with given text and delete button
  // unless withDeleteButton argument is provided as false
  const create$li = (id, text, withDeleteButton = true) => {
    const $li = $(`<li id='${id}' class='list-group-item'>`);
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(create$li(2, "No saved Notes", false));
  }

  notes.forEach((note) => {
    const $li = create$li(note.id, note.title).data(note);
    noteListItems.push($li);
  });

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  return renderNoteList();
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
