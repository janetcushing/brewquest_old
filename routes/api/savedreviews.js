const router = require("express").Router();
const savedReviewsController = require("../../controllers/savedReviewsController");

// Matches with "/api/savedreviews"
router.route("/")
  .get(savedReviewsController.findAllbyBrewery)
  .post(savedReviewsController.create)
//   .delete(savedNotesController.remove);

module.exports = router;