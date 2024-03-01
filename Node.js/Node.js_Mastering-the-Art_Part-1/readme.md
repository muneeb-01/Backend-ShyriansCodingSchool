1. DataBase => is aplace where all the dat of any app is stored.

types

11. Relational Database
12. Non-Relational Database

13. code side ----------- mongodb side

14. Database setup ------> Database formation
15. Model ----------> collection
16. Schema --------> Document

17. in short
    aik app ka poora data => Database
    app kay database main bohat sari cheezon ka data => Collection // User's, Product's. etc
    aik collection main bohat saara data => Schema // User's data , Products Data. etc

18. MongoDB - Non-Relational Database

19. installation (from any browser)

20. install mongoose from (npm i mongoose)

21. setup mongoose
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://127.0.0.1:27017/nameKuchBHi")

22. Make schema = (schema matlab bannay walay har document main kya kya hoga)
    const userSchema mongoose.schema({
    username:String,
    name:String,
    age:Number
    });

23. Make Model
    mongoose.model("user", userSchema) //('name kuch bhi','schema you want to pass')

24. Export the model
    module.exports = mongoose.model("user", userSchema)

25. Creting my first database, model and schema

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/practice");

const userSchema = mongoose.Schema({
name: String,
fatherName: String,
age: Number,
});

module.exports = mongoose.model("user", userSchema);

6. creating first user in model or document and send it to the browser // install JSON viewer extension in chrome

router.get("/create", async function (req, res, next) {
const createdUser = await userModel.create({
name: "Muneeb",
fatherName: "Muneer",
age: 20,
});
res.send(createdUser);
});

7. Find all user in current database

router.get("/findUser", async function (req, res, next) {
const alluser = await userModel.find();
res.send(alluser);
});

8. find one User in curret database //pass the object in findOne function all checkout the user by giving it id or name or any other property

router.get("/findOneUser", async function (req, res, next) {
const findedOneUser = await userModel.findOne({ name: "Muneeb" });
res.send(findedOneUser);
});

9. find User and delete it //pass the object in findOneAndDelete function all checkout the user by giving it id or name or any other property

router.get("/deleteUser", async function (req, res, next) {
const deletedUser = await userModel.findOneAndDelete({ name: "Muneeb" });
res.send(deletedUser);
});

10. Session Storage:
    first install (npm i express-session)

    and then in app.js,

    require and initialized it
    const session = require("express-session");

    app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "hihohaha",
    }));

How to create session
router.get("/sessionSet", (req, res) => {
req.session.kuchBhi = true; //setting up the value of session
res.render("index"); // always pass somthing as .render() or .send()
});

How to check session
router.get("/sessionCheck", (req, res) => {
console.log(req.session) //or req.session.kuchBhi jo crete krtay waqat diya tha
});

How to Delete Session
router.get("/removeSessionBanned", (req, res) => {
req.session.destroy((err) => {
if (err) throw err;
res.send("Ban Removed");
});
});

11. Cookies Storage
    your package is already installed with (express-generator)

How to create Cookie?
router.get("/setCookie", (req, res) => {
//setting up cookie
res.cookie("age", 25); // if you send something to the browser then use "res"
res.send("Set Hogayi");
});

How to Read Cookies?
router.get("/checkCookie", (req, res) => {
//read cookie
if (req.cookies.age) { // if you need something from the browser then use "req"
res.send("cookie age is " + req.cookies.age);
} else {
res.send("NO cookies");
}
});

How to Clear Cookie?
router.get("/clearCookie", (req, res) => {
//delete cookie
res.clearCookie("age"); //again you are sending somthing to the browser that why use "res"
res.send("Clear ho gayi phir say check karo ");
});
