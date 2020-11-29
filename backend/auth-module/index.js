const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoConStr = require("./config/config").mongo_connection_str;

// We load the Models
require("./models/User");

const authRouter = require("./api/auth/auth.routes");
require("dotenv").config();

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    if (process.env.NODE_ENV != "test") {
      console.log(req.originalUrl);
    }
    return next();
  }
});
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// db config
mongoose
  .connect(
    mongoConStr,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/auth", authRouter);

const port = process.env.PORT || 4200;

app.listen(port, () => {
    console.log(`Server up and running on port ${port} !`);
});
