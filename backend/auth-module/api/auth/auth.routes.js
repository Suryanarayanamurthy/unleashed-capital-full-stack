const express = require("express");
const router = express.Router();
const passport = require("passport");

const AuthController = require("./controllers/auth.controller");
const AuthMiddleware = require("./middlewares/auth.middleware");

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", AuthController.registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", AuthController.loginUser);

router.post("/refresh", [
  AuthMiddleware.JwtNeeded,
  AuthMiddleware.verifyRefreshBodyField,
  AuthMiddleware.validRefreshNeeded,
  AuthController.refresh_token
]);

module.exports = router;
