const router = require("express").Router();
const controller = require("../../controllers/controller");
const placesApiController = require("../../controllers/placesApiController");

// Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

// Matches with "/api/place/:searchLocation"
router.route("/api/places/:query")
.get(placesApiController.getPlaces(req.params.id));
module.exports = router;
