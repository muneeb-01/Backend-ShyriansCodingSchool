const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/dataAssosiation");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dp: {
    type: String, // Assuming you store the profile picture as a URL or file path
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);
