//=================================================
// dependencies
//=================================================
const Express = require("express");
const mongojs = require("mongojs");
const router = Express.Router();
const axios = require("axios");
const controller = require("../controllers/controller.js");

//=================================================

//==============
// ROUTES
//==============

//----------------------------------------------------------
// get brewery info from google places api based on zip code
//----------------------------------------------------------
router.get("/api/places/:location", function (req, res) {
  console.log("im on the server side about to get the brewery data");
  controller.getBreweryData(req, res);
});

// ----------------------------------------------
// add a brewery to  the database
// ----------------------------------------------
router.post("/api/brewery/:name", function (req, res) {
  console.log("im on the server side about to insert the brewery data into the db");
  controller.insertNewBreweryIntoDatabase(req, res);
});


// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;