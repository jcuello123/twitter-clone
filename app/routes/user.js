const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.patch("/", async (req, res) => {
  try {
    const user = await User.findOne({
      username_lower: req.body.username.toLowerCase(),
    });

    const posts = await Post.find({ name: user.username });
    console.log(posts);
    if (req.body.imageData) {
      const result = await cloudinary.v2.uploader.upload(req.body.imageData, {
        upload_preset: "profile-pictures",
      });
      user.imageURL = result.secure_url;
      posts.forEach((post) => {
        post.profile_pic = result.secure_url;
        post.save();
      });
    }
    await user.save();
  } catch (error) {
    res.json("error");
    console.log(error);
  }
});

module.exports = router;
