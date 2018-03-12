const router = require("express").Router();
const savedPlacesRoutes = require("./savedplaces");
const savedPlaceRoutes = require("./savedplace");
const savedNotesRoutes = require("./savednotes");
const apiPlaces = require("./apiplaces");
const user = require("./user");


// Database routes - Places/Breweries table     //
router.use("/savedplaces", savedPlacesRoutes);
router.use("/savedplace", savedPlaceRoutes);


// Database routes - Notes table     //
router.use("/savednotes", savedNotesRoutes);

// API route - to get Google api places data
router.use("/apiplaces", apiPlaces);

// Database Routes - User table
router.use("/user", user);

module.exports = router;
