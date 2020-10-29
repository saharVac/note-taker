// DEPENDENCIES
const express = require("express");

// Establish this as an express server
const app = express()

const PORT = process.env.PORT || 8080;

// Express handling data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json)

// LINK (require) to route handlers
// html routes
// API routes

// Listener
app.listen(PORT, function() {
  console.log("APP litening on port: ", PORT)
})