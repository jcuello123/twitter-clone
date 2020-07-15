const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const Post = require("../models/post");
const Filter = require("bad-words"),
  filter = new Filter();

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1, // limit each IP to 1 request per windowMs
});

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.use("/", limiter);

router.post("/", (req, res) => {
  const post = new Post({
    name: filter.clean(req.body.name),
    content: filter.clean(req.body.content),
    date: req.body.date,
  });
  post.save();

  res.json(post);
});

module.exports = router;
