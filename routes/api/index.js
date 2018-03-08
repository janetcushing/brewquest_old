const router = require("express").Router();
const savedPlacesRoutes = require("./savedplaces");
const apiPlaces = require("./apiplaces");


// Database routes - Places/Breweries table

router.use("/savedplaces", savedPlacesRoutes);

// API routes - to get places data
router.use("/apiplaces", apiPlaces);

module.exports = router;
