const router = require("express").Router();
const savedPlacesRoutes = require("./savedplaces");
const findBrewery = require("./findbrewery");
const saveBrewery = require("./savebrewery");

// Book routes
router.use("/savedplaces", savedPlacesRoutes);
router.use("/savebrewery", saveBrewery);
router.use("/findbrewery", findBrewery);

module.exports = router;
