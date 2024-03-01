var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");
const postModel = require("./post");
const users = require("./users");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res) {
  res.render("index", { footer: false });
});

router.get("/login", function (req, res) {
  res.render("login", { footer: false });
});

router.get("/feed", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const allPosts = await postModel.find().populate("userid");
  res.render("feed", { footer: true, allPosts: allPosts, user: user });
});

router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
  res.render("profile", { footer: true, user: user });
});

router.get("/search", isLoggedIn, function (req, res) {
  res.render("search", { footer: true });
});

router.get("/edit", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("edit", { footer: true, user: user });
});

router.get("/upload", isLoggedIn, function (req, res) {
  res.render("upload", { footer: true });
});

router.post("/register", (req, res, next) => {
  const userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

router.post("/update", upload.single("image"), async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    {
      username: req.session.passport.user,
    },
    { username: req.body.username, name: req.body.name, bio: req.body.bio },
    { new: true }
  );
  if (req.file) {
    user.profileImage = req.file.filename;
  }
  await user.save();
  res.redirect("/profile");
});

router.get("/username/:username", async function (req, res) {
  const regex = new RegExp(`^${req.params.username}`, "i");
  const user = await userModel.find({ username: regex });
  res.json(user);
});

router.get(`/like/post/:id`, isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.findOne({ _id: req.params.id });

  console.log(post);

  if (post.likes.indexOf(user._id) === -1) {
    post.likes.push(user._id);
  } else {
    post.likes.splice(post.likes.indexOf(user._id), 1);
  }

  await post.save();
  res.redirect("/feed");
});

router.post(
  "/upload",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      userid: user._id,
      picture: req.file.filename,
      caption: req.body.caption,
    });

    user.posts.push(post._id);
    await user.save();

    res.redirect("/feed");
  }
);

module.exports = router;
