var express = require("express");

var app = express();
app.use((req, res, next) => {
  console.log("first");
  next();
});
app.use((req, res, next) => {
  console.log("Second");
  next();
});

app.get("/", function (req, res) {
  res.send("Hi I am Muneeb");
});

app.get("/Contact", function (req, res) {
  res.send("Hi I am Muneeb");
});
app.get("/Profile", function (req, res) {
  res.send("Hi I am Muneeb");
});

app.listen(3000);

/* 1.install nodejs in your pc or laptop

2. import export in javascript 
to export 
module.exports = {first:a, second:b,}
to import 
require("file path from where you are exporting values")

3.How to run a written code
open terminal using ctrl + templete literal or backticks and write
node ./script.js
that's it

4.what is npm
npm aik gajah hai jahan say bohat say package miltay hain 

Package's -> bani banai cheezain kehlatay hain packages

my first packages in node.js 
one-liner-joke
figlit

5. npm express  // Mean's Express.js
express is a framework for node.js
express is mainly use for routing 

Routing Types -> GET , POST , PUT , DELETE , PATCH

POST Route -> is main data url main nahi aaata
GET Route -> is main data url main aata hai 

6.How to use Express.js

var express = require("express");
const app =  express();

app.get("Routes" , function(request , response){
    res.send("Kuch BHi");
});

app.listen("3000") // 4 digits kuch bhi

7. you have to run your code after any small changes for getting rid of it install nodemon package in your complete windows or you can only install in the current folder
npm install nodemon -g  //-g is for global yani poori windows pr install kr do

8. How to run after Nodemon

npx nodemon file-path

Last but not the least MIDDLEWARE

9.Middleware aik aisa function hai jo kisi bhi route say pehlay chalta hai 
jis ka matlab agar kisi route say pehlay koi kam karwana hai to middleware ko use kiya ja sakta hai

How to use middleware?
app.use(function(request,response,next){
    console.log("Muneeb")
    next();
});

ab ye next kis liye bhai?
jab humara middleware chalta hai to request jam ho jati hai or bs us request ko push denay kay liye hota hai next();
*/
