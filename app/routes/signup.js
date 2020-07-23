const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    let user = await User.findOne({
      username_lower: req.body.username.toLowerCase(),
    });

    //const result = await cloudinary.v2.uploader.upload(req.file.path);

    if (req.body.password.length <= 5) return res.json("short");

    if (!user) {
      const newUser = new User({
        username: req.body.username,
        username_lower: req.body.username.toLowerCase(),
        password: await bcrypt.hash(req.body.password, 10),
      });

      //if (req.file) newUser.imageURL = result.secure_url;

      await newUser.save();
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
