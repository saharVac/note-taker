// DEPENDENCIES
var path = require("path")

// ROUTING
module.exports = function(app) {

  // home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  })

  // notes page
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  })


}