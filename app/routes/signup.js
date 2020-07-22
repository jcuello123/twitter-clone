const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({
      username_lower: req.body.username.toLowerCase(),
    });

    if (!user) {
      const newUser = new User({
        username: req.body.username,
        username_lower: req.body.username.toLowerCase(),
        password: await bcrypt.hash(req.body.password, 10),
      });

      newUser.save();
      res.json("successful");
    } else {
      res.json("failed");
    }
  } catch (error) {
    console.log(error);
    res.json("error");
  }
});

module.exports = router;
