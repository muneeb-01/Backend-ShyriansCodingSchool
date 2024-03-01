var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use((req, res, next) => {
  //   console.log("Muneeb");
  next();
});

app.get("/", (request, response) => {
  response.send("HELLO WORLD!!!!!!");
});

app.get("/Contact", (request, response) => {
  response.send("HELLO WORLD from Contact Page!!!!!!");
});

app.get("/Profile/:name", (request, response) => {
  response.render("index", { name: `${request.params.name}` });
});

app.listen(3001);

//NOTES
function NoteFunctions() {
  /* 
1. Node.js vs Express.js //which is more powerful
Both are equivalant but you can use node js alone but if you want to use express.js you must need one thing which is called Node.js

2. What is express.js?
Express.js is basically use for routing

3. Why Express.js but not Http 
because if you are are using http than you have to write much code as compareed to express.js but in express.js behind the scenes you are using http

4.Routing 
routes bananay kay process ko kehtay hain Routing 
/profile
/contact

5.express.js how to setup

var express = require("express");
var app = express();

app.get("/", (request, response) => {
  response.send("HELLO WORLD!!!!!!");
});

app.get("/Contact", (request, response) => {
  response.send("HELLO WORLD from Contact Page!!!!!!");
});

app.listen(3001);  //jo likha us ko chalanay kay liye on localhost:3001

6. middleware
wo cheez jo kisi bhi route say pehlay chalay us ko middleware kehtay hain

app.use((req, res, next) => {
  console.log("first");
  next();                       // next kiya hai is main
});

next(); //is to push the request to the next route


7. Dynamic Routing
 aisa route jis ka koi bhi hissa bar bar same rehta hai aur sirf kuch hi hissa bar bar change hota hai us kay liye hoti hai dynamic routing
to create dynamic routing add : /profile/:username
Example:
app.get("/Contact", (request, response) => {
  response.send("HELLO WORLD from Contact Page!!!!!!");
});

8.How to access route parameters during dynamic routing

The thing which is after : colon is called params,
and the name which is in browser after repeated url can be get by ${request.params.name}

9. Templete Engine 
Types of Templete Engine 
PUG , HANDLEBAR , EJS , JADE

we are using EJS. But why?
Because it completely similar to the Html

10. Set Up EJS 
    step 1 -> install ejs (npm i ejs)
    step 2 -> configure ejs in script.js (app.set ("view engine", "ejs"))
    step 3 -> ek "views" folder create karo
    step 4 -> phir is folder main  ejs files banao (index.ejs)
    step 5 -> res.send ki jagah res.render() function use karo 

    aur in baatoon ka dehan rakho 
    render function main "views" folder wali kisi bhi file ka naam "index" (double quote main bina .ejs kay) likho.

11. Static Files //images, stylesheet, aur frontend.js ko manage karnay kay liye

step 1 -> create a folder called public
step 2 -> create three folders inside it images , stylesheets , javascripts
step 3 -> configure the express static in script.js
step 4 -> understand the path

*/
}
