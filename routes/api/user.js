const router = require("express").Router();
const userController = require("../../controllers/userController");


 // Matches with "/api/user/     
 router
 .route("/")
 .get(userController.findByName)
 .post(userController.create);
//  .put(userController.update)
//  .delete(userController.remove);


module.exports = router;