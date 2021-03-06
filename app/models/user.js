const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  username_lower: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema, "users");
