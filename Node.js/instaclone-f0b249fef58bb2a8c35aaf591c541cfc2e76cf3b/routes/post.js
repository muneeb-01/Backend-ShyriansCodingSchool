const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/instaclone");

const postSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  picture: String,
  caption: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
