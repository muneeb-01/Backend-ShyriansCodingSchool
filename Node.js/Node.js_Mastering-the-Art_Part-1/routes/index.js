var express = require("express");
var router = express.Router();
var userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//DataBase Crete(); , find(); , findOne(); , findOneAndDelete();
router.get("/create", async function (req, res, next) {
  const createdUser = await userModel.create({
    name: "Muneeb",
    fatherName: "Muneer",
    age: 20,
  });
  res.send(createdUser);
});

router.get("/findUser", async function (req, res, next) {
  const alluser = await userModel.find();
  res.send(alluser);
});

router.get("/findOneUser", async function (req, res, next) {
  const findedOneUser = await userModel.findOne({ name: "Muneeb" });
  res.send(findedOneUser);
});

router.get("/deleteUser", async function (req, res, next) {
  const deletedUser = await userModel.findOneAndDelete({ name: "Muneeb" });
  res.send(deletedUser);
});

//Session Code
router.get("/setSession", (req, res) => {
  req.session.ban = true;
  res.send("Session set (ban = True)");
});

router.get("/checkSession", (req, res) => {
  if (req.session.ban === true) {
    res.send("You are Banned " + req.session.ban);
  } else {
    res.send("Hello!!");
  }
});

router.get("/destroySession", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send("You Are Unbanned now");
  });
});

// CookiesCode

router.get("/setCookie", (req, res) => {
  res.cookie("age", 25);
  res.send("Cookie Set");
});

router.get("/checkCookie", (req, res) => {
  if (req.cookies.age) {
    res.send(req.cookies.age);
  } else {
    res.send("No cookie");
  }
});

router.get("/clearCookie", (req, res) => {
  res.clearCookie("age");
  res.send("Cookie Deleted : Chech Once Again");
});
module.exports = router;
