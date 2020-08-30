const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router
  .route("/")
  .get(UserController.getUsers)
  .delete(UserController.deleteUsersById);
router
  .route("/:id")
  .get(UserController.getUserById)
  .patch(UserController.updateUsers);

module.exports = router;
