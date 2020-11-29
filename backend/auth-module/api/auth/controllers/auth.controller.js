const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const passport = require("passport");
const secret = require("../../../config/config").secret
// Load User model

const mongoose = require("mongoose");
var User = mongoose.model("User");

exports.generateTokens = user => {
  return new Promise((resolve, reject) => {
    // User needs to be identified with id
    // We generate the refresh token :
    // we generate a string
    let refreshId = user.id + secret;
    // We generate salt
    bcrypt.genSalt(10, function(err, salt) {
      // We hash the refresh token with the salt
      bcrypt.hash(refreshId, salt, function(err, refresh_token) {
        // We generate the jwttoken
        jwt.sign(
          user,
          secret,
          {
            expiresIn: 60 * 60 // 30 min in seconds
          },
          (err, jwttoken) => {
            if (err) {
              reject(err);
            }
            resolve([jwttoken, refresh_token]);
          }
        );
      });
    });
  });
};

exports.refresh_token = (req, res) => {
  // The refresh token has been validated by the middle ware before.

  try {
    req.body = req.jwt;
    const userId = req.body.id;

    User.findOne({ _id: userId }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ auth: "Email not found" });
      }
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        permissionLevel: user.permissionLevel
      };
      this.generateTokens(payload)
        .then(([token, refresh_token]) => {
          res.status(200).json({
            success: true,
            token: "Bearer " + token,
            refresh_token: refresh_token
          });
        })
        .catch(err => {
          return res.status(400).send({ error: "Error", err: err });
        });
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

exports.registerUser = (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  
        // Hashing password before saving it in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });

};

exports.loginUser = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email })
    .select("+password")
    .then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ auth: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          this.generateTokens(payload)
            .then(([token, refresh_token]) => {
              res.status(200).json({
                success: true,
                token: "Bearer " + token,
                refresh_token: refresh_token,
                user
              });
            })
            .catch(err => {
              return res.status(400).send({ error: "Error", err: err });
            });
        } else {
          return res.status(400).send({ error: "Password incorrect" });
        }
      });
    });
};

exports.check = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email })
    .select("+password")
    .then(user => {
      console.log(user.id)
      // Check if user exists
      if (!user) {
        return res.status(404).json({ auth: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          this.generateTokens(payload)
            .then(([token, refresh_token]) => {
              res.status(200).json({
                success: true,
                token: "Bearer " + token,
                refresh_token: refresh_token
              });
            })
            .catch(err => {
              return res.status(400).send({ error: "Error", err: err });
            });
        } else {
          return res.status(400).send({ error: "Password incorrect" });
        }
      });
    });
};