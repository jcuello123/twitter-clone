const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  likedBy: {
    type: Array
  },
  likes:{
    type: Number,
    default: 0
  },
  profile_pic :{
    type: String,
    default: 'emptycontact.png'
  }
});

module.exports = mongoose.model("Post", postSchema);
