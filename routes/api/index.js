const router = require("express").Router();
const savedPlacesRoutes = require("./savedplaces");
const findBrewery = require("./findbrewery");

// Book routes
router.use("/savedplaces", savedPlacesRoutes);
router.use("/findbrewery", findBrewery);

module.exports = router;
