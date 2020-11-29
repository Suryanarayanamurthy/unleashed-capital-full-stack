const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../auth/middlewares/auth.middleware");
const UsersController = require("./controllers/users.controller");


router.get("/", [UsersController.list]);

router.get("/", [UsersController.check]);
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

router.route('/check').post(function(req, res) {
  passport.authenticate('bearer', { session: false }, function(err, user) {
    if (err) {
      console.error(err)
      return res.status(406).send('E_UNEXPECTED::' + err.message)
    }
    if (!user) {
      return res.status(406).send('E_AUTH_OBJECTNOTFOUND::User')
    } else if ('success' in user && user.success === false) {
      return res.json(user)
    } else {
      if (user.fa2 && user.fa2code) {
        return res.status(406).send('E_AUTH_OBJECTNOTFOUND::2FA')
      }
      return res.json({ 
			userId: user._id.toString(),
			userType: user.user_type
		     })
    }
  })(req, res)
})

module.exports = router;
