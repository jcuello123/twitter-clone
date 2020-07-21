require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const SECRET = process.env.SESSION_SECRET;
const passport = require("passport");

//Passport config
require('./config/passport')(passport);

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client/build"));
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/routes"));

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
