const router = require("express").Router();
const savedPlacesRoutes = require("./savedplaces");

// Book routes
router.use("/savedplaces", savedPlacesRoutes);

module.exports = router;
