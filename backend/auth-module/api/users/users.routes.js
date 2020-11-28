const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../auth/middlewares/auth.middleware");
const UsersController = require("./controllers/users.controller");


router.get("/", [UsersController.list]);
router.get("/:userId", [
  UsersController.getById
]);
router.patch("/:userId", [
  AuthMiddleware.validJWTNeeded,
  UsersController.patchById
]);
router.delete("/:userId", [
  AuthMiddleware.validJWTNeeded,
  UsersController.removeById
]);

module.exports = router;
