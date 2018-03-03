//=================================================
// dependencies
//=================================================
const Express = require("express");
// const mongojs = require("mongojs");
const router = Express.Router();
// const axios = require("axios");
const breweryController = require("../../controllers/breweryController.js");

//=================================================

//==============
// ROUTES
//==============

//----------------------------------------------------------
// get brewery info from google places api based on zip code
//----------------------------------------------------------
router.route("/:location")
.get(breweryController.getBreweryData);

// ----------------------------------------------
// add a brewery to  the database
// ----------------------------------------------
// router.post("/api/brewery/:name", function (req, res) {
//   console.log("im on the server side about to insert the brewery data into the db");
//   controller.insertNewBreweryIntoDatabase(req, res);
// });


//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;