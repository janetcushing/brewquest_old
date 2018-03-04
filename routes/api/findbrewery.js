//=================================================
// dependencies
//=================================================
const router = require("express").Router();
const findBreweryController = require("../../controllers/findBreweryController.js");

//-----------------------------------------------------------------------------
// get brewery info from google places api based on zip code or city - state
//-----------------------------------------------------------------------------
router.route("/:location")
.get(findBreweryController.getBreweryData);

//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;