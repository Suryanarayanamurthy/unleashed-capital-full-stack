const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = require("../../../config/config").secret
exports.verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    next();
  } else {
    return res.status(403).send({ error: "Need to pass a refresh token" });
  }
};

exports.validRefreshNeeded = (req, res, next) => {
  // We get the refresh token provided by the user
  var refresh_token = req.body.refresh_token;
  // We use bcrypt to compare the hash with req.jwt.userId + JWT SECRET
  bcrypt.compare(req.jwt.id + secret, refresh_token, function(
    err,
    comp
  ) {
    if (err || !comp) {
      res.status(403).send({ error: "Invalid refresh token" });
    } else {
      req.body = req.jwt;
      next();
    }
  });
};

// WARNING : The following doesnt verify the jwt. Just verifies its existence.
exports.JwtNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res
          .status(403)
          .send({ error: "Need to pass a token with 'Bearer'" });
      } else {
        req.jwt = jwt.decode(authorization[1]);
        return next();
      }
    } catch (err) {
      return res.status(403).send({ error: "Invalid token" });
    }
  } else {
    return res.status(403).send({ error: "Need to pass a token" });
  }
};

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(403).send({ error: "Need to pass a valid token" });
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).send({ error: "Need to pass a valid token" });
    }
  } else {
    return res.status(403).send({ error: "Need to pass a valid token" });
  }
};
