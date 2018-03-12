const router = require("express").Router();
const savedNotesController = require("../../controllers/savedNotesController");

// Matches with "/api/savednotes"
router.route("/")
  .get(savedNotesController.findAllbyBrewery)
  .post(savedNotesController.create);

module.exports = router;