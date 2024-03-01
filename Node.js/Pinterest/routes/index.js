var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");

passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});

//first Step # 01 to authenticate user:
router.post("/register", (req, res) => {
  const { fullname, username, email } = req.body;
  const userData = new userModel({ fullname, username, email });

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
    failureFlash: true,
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logOut(function (err) {
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

router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
  console.log(user);

  res.render("profile", { user: user });
});

router.get("/feed", isLoggedIn, (req, res) => {
  res.render("feed");
});

router.post(
  "/upload",
  isLoggedIn,
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(404).send("Not find any file");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const postData = await postModel.create({
      user: user._id,
      image: req.file.filename,
      postText: req.body.postText,
    });

    await user.posts.push(postData._id);
    await user.save();
    res.redirect("/profile");
  }
);

module.exports = router;
