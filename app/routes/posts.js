const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const Post = require("../models/post");
const { ensureAuthenticated } = require("../config/auth");
const passport = require("passport");
const Filter = require("bad-words"),
  filter = new Filter();

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1, // limit each IP to 1 request per windowMs
});

//list all posts
router.get("/", ensureAuthenticated, async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

//update likes
router.patch("/", ensureAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.body.post._id);
    const { liked } = req.body;
    const { username } = req.body;

    const user = post.likedBy.find((u) => u === username);
    console.log(liked);
    if (liked) {
      if (user == null || user == undefined) {
        post.likedBy.push(username);
      }
      post.likes++;
    } else {
      if (user !== null || user !== undefined) {
        const index = post.likedBy.indexOf(user);
        post.likedBy.splice(index, 1);
      }
      post.likes--;
    }
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.json("Error");
  }
});

//login
router.get("/login", (req, res) => {
  res.json(req.user.username);
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json("authenticated");
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  res.json("logged out");
});

router.use("/", limiter);

router.post("/", ensureAuthenticated, (req, res) => {
  const post = new Post({
    name: filter.clean(req.user.username),
    content: filter.clean(req.body.content),
    date: req.body.date,
  });
  post.save();

  res.json(post);
});

module.exports = router;
