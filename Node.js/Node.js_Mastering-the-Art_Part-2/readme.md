1. create express generator:
   open cmd
   cd desktop
   expess appname --view=ejs
   cd appname
   npm install

2. flash messages:
   jab bhi ap koi ejs page setup karo gay wahan par apko koi information deni ho gi
   they are more like good looking alert's , warning's and description's

why flash-messages?
it is impossible kay ap kisi data ko pass krwa do aik route say doosray route ko lakin ye possible ho sakta hai connect flash ka use krkay.

how to install and use and important instruction?

1. install it (npm i connect-flash)
2. if you want to use connect-flash than you have to install one more package called express-session (npm i express-session)
3. require and use both (express-session & connect-flash)

var session = require("express-session");
var flash = require("connect-flash");

app.use(
session({
resave: false,
saveUninitialized: false,
secret: "kuch bhi likh dona bola to hai",
})
);
// use flash after using session it is compulsory
app.use(flash());

4. How to use?
   //to pass the data
   router.get("/Failed", (req, res) => {
   req.flash("name", "muneeb");
   req.flash("age", 20);
   res.send("Set ho gai check karo");
   });

   //to use the data
   router.get("/checkKaro", (req, res) => {
   console.log(req.flash("age"), req.flash("name"));
   res.send("check karo terminal par");
   });
