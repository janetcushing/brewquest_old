const router = require("express").Router();
const savedPlacesRoutes = require("./savedplaces");
const savedPlaceRoutes = require("./savedplace");
const apiPlaces = require("./apiplaces");
const user = require("./user");


// Database routes - Places/Breweries table     //
router.use("/savedplaces", savedPlacesRoutes);
router.use("/savedplace", savedPlaceRoutes);

// API route - to get Google api places data
router.use("/apiplaces", apiPlaces);

// User route - to get user data
router.use("/user", user);

module.exports = router;
