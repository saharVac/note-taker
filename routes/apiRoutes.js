// Load data
var noteDataPath = "./db/db.json";
var fs = require("fs")

// async func to read the db
async function readNotes() {
  const notes = JSON.parse(fs.readFileSync(noteDataPath, async function(err, data) {
    if (err) throw err;
  }))
  return notes
}

// async func to write to db
async function appendNote(data) {
  notes = await readNotes()
  notes.push(data)
  // note append req body
  fs.writeFile(noteDataPath, JSON.stringify(notes), function(err) {
    if (err) throw err;
  })
}

async function deleteNote(id) {
  // fetch notes
  let notes = []
  fs.readFile(noteDataPath, function(err, data) {
    if (err) throw err;
    notes = data;
  })

  // delete note at given id
  notes.forEach((note, index) => {
    if (note.id === id) {
      // remove note from list
      noteData.splice(index, 1)
      // exit loop
      break;
    }
  })
}


module.exports = function(app) {
  // ROUTING

  // GET /api/notes Should read the db.json file and return all saved notes as JSON.
  app.get("/notes", function(req, res) {
    readNotes(req.body);
    res.json(noteData);
  });

  // POST /api/notes Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
  app.post("/notes", function(req, res) {
    appendNote()
    res.json(true);
  })

  // DELETE /api/notes/:id Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
  app.delete("/notes/:id", function(req, res) {
    deleteNote(id);
  })
}