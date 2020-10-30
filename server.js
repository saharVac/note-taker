// DEPENDENCIES
const express = require("express");
const path = require("path");

// Establish this as an express server
const app = express();

const PORT = process.env.PORT || 8080;

// Express handling data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// LINK (require) to route handlers
// html routes
require("./routes/htmlRoutes")(app);
// API routes
require("./routes/apiRoutes");

// Listener
app.listen(PORT, function() {
  console.log("APP litening on port: ", PORT)
})