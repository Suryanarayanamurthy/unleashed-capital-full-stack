const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hased_password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

mongoose.model("User", userSchema);
