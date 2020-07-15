const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

let status = "";

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      const newUser = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
      });

      newUser.save();
      res.json("successful");
    } else {
      res.json("failed");
    }
  } catch (error) {
    res.json("error");
  }
});

module.exports = router;
