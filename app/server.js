require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const Post = require("./models/post");
const Filter = require('bad-words'),
    filter = new Filter();
    
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1, // limit each IP to 1 request per windowMs
});

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Serve static assests if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
}

//Routes
//app.use('/', require('./routes/route'));
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.use('/posts',limiter);

app.post("/posts", async (req, res) => {
  const post = new Post({
    name: filter.clean(req.body.name),
    content: filter.clean(req.body.content),
    date: req.body.date,
  });
  await post.save();
  
  res.json(post);
});

//Connect to DB
try {
  const url = process.env.MONGODB_URI || "mongodb://localhost/twitter-clone";
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const con = mongoose.connection;
  con.on("open", () => console.log("Connected to DB"));
} catch (error) {
  console.log(error);
}



//Port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
