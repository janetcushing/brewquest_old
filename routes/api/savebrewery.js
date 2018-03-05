//=================================================
// dependencies
//=================================================
const router = require("express").Router();
const saveBreweryController = require("../../controllers/saveBreweryController.js");

//=================================================

//==============
// ROUTES
//==============
// ----------------------------------------------
// add a brewery to  the database
// ----------------------------------------------
router.route("/:name")
.post(saveBreweryController.createBrewery);
// });

//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;