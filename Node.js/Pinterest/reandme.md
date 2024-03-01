Data Association: matlab aik model kay data ko dosray model kay data say jor dena id ki madad say

example:
agar apkay pass aik user hai to wo post to banaye ga hi,
aur wo post usi user ki wajah say banay ga or jab do data aisay closly related hoon aik dossray say  
to hum kya krtay hain kay dono ko jor detay hain id ki madad say
yani user ki id ko pass krwa detay hain uski har post ko or har post ki id ka array bana kr paas krwatay hain user ko.

Code Snippets

1. create basic code with express-generator and also install mongoose

2. Create UserModel in user.js or any other file

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/dataAssosiation");

const userSchema = new mongoose.Schema({
fullName: ,
username: ,
password: ,
email: ,
dp: ,

// important thing is post crete other axs you need
posts: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "Post", //reference of the Post model in User
},
],
});

module.exports = mongoose.model("User", userSchema);

3. create Postmodel

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User" //reference of the user model in post
},
postText: '',
currentDateAndTime: '',
likes: [],
});

module.exports = mongoose.model("Post", postSchema);

4. create User

router.get("/createUser", async (req, res) => {
const user = await userModel.create({
fullName: "Muneeb Mughal",
username: "Mughal_01",
password: "Muneeb",
email: "muneerahmed8556@gmail.com",
posts: [],
});

res.send(user);
});

5. create Post

router.get("/createPost", async (req, res) => {
const createdPost = await postModel.create({
user: "id of the user you created above",
postText: "Main Koi post nhi karoon ga ab bilkul bhi nhi ",
});
const user = await userModel.findOne({ \_id: "id of the user you created above" });
user.posts.push(createdPost.\_id);
await user.save();

res.send("Post Created");
});

6. checkOut all posts and populate them all

router.get("/allPostOfOneUser", async (req, res) => {
const user = await userModel
.findOne({ \_id: "id of the user you created above" })
.populate("posts");

res.send(user);
});
