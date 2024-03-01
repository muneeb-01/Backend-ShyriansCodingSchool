var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});
//Authentication And Autherization

//register route
router.post("/register", (req, res) => {
  var userData = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });
  userModel
    .register(userData, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

//profile
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

//login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);
//logout
router.get("/logout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
//isLoggedIn
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
/*
//connect flash code
router.get("/Failed", (req, res) => {
  req.flash("name", "muneeb");
  req.flash("age", 20);
  res.send("Set ho gai check karo");
});

router.get("/checkKaro", (req, res) => {
  console.log(req.flash("age"), req.flash("name"));
  res.send("check karo terminal par");
});

//intermidiate mongodb
router.get("/createDocument", async (req, res) => {
  //userOne
  const userdata = await userModel.create({
    username: "Muneeb",
    nickname: "Binni",
    description:
      "Hello!! , i am muneeb a 20 years old guy and very excited to learn backend. so, that's why i am studing from 6 to 7 hours",
    categories: [
      "javaScript",
      "Node.js",
      "Mongodb",
      "Express.js",
      "Backend",
      "MernStack",
    ],
  });
  res.send(userdata);
});
router.get("/createDocument1", async (req, res) => {
  //userTwo
  const userdata = await userModel.create({
    username: "areeg",
    nickname: "guriya",
    description:
      "Hello!! , i am areeg known as guria and i am completing my masters in Urdu this year so that i am so excited about my result",
    categories: ["Tution Wali", "Masters", "Urdu "],
  });
  res.send(userdata);
});
router.get("/createDocument2", async (req, res) => {
  //userThree
  const userdata = await userModel.create({
    username: "Ateeb",
    nickname: "Ateeb",
    description:
      "Hello!! , i am Ateeb, a guy who just completed his BBA from IQRA University. I have so strong grip on Accounding & Finance",
    categories: ["University", "Study", "BBA", "Accounding & Finance"],
  });
  res.send(userdata);
});

// How to do a case insensitive search on your data in mongodb
router.get("/caseInsensitive", async (req, res) => {
  const regex = new RegExp("^mUnEEb$", "i"); // this will must find the user with the name muneeb no matter the muneeb is written as MuneeB or MuNEeb or any other way and one more thing (^) thing define that the word start from this and this ($) thing define that the word end like this
  const users = await userModel.find({ username: regex });
  res.send(users);
});

// How to search on the basis of same category of differnt peoples
router.get("/searchSameCategoryUsers", async (req, res) => {
  const words = ["javascript", "BBA"];
  const regex = new RegExp(words.join("|"), "i");
  const users = await userModel.find({
    categories: { $all: [regex] },
  });
  res.send(users);
});

//How to search on the basis of specific date range on mongoose
router.get("/searchOnBasisOfSpecificDate", async (req, res) => {
  const date1 = new Date("2024-02-25");
  const date2 = new Date("2024-02-28");
  const users = await userModel.find({
    datecreated: { $gte: date1, $lte: date2 }, //$gte stands for greater than equal to and $lte stands for less than equal to
  });
  res.send(users);
});

//How to search on the basis of specific field existance in schema or document
router.get("/searchOnBasisOfExistance", async (req, res) => {
  const users = await userModel.find({ datecreated: { $exists: true } });
  res.send(users);
});

//How to search on the basis of specific field lenght's existance in schema or document
router.get("/searchOnBasisOfLenghtExistance", async (req, res) => {
  const users = await userModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$nickname" }, 6] },
        { $lte: [{ $strLenCP: "$nickname" }, 6] },
      ],
    },
  });
  res.send(users);
});
*/
module.exports = router;
