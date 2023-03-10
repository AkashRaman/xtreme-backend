const express = require("express");
const app = express();
const cors = require("cors");
const Users = require("./model/User");
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
var morgan = require('morgan');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
const User = require("./model/User");

app.get('*', async(req,res) => {
  // await Users.deleteMany({});
})

app.post('/user/login', async (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  if(email === '' || password === ''){
    if(email === '' && password === ''){
      return res.send(500, { error: 'Enter Email and Password' });
    } else if(email === ''){
      return res.send(500, { error: 'Enter Email' });
    } else{
      return res.send(500, { error: 'Enter Password' });
    }
  }
  
  if(!(email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("@citchennai.net"))) return res.send(500, { error: 'Invalid Email' });

  const user = await Users.findOne({'email': email, 'password': password});

  if(user == null) return res.send(500, { error: 'User Not Found' });

  return res.send(user);
})

app.post('/user/register', async (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  if(email === '' || password === ''){
    if(email === '' && password === ''){
      return res.send(500, { error: 'Enter Email and Password' });
    } else if(email === ''){
      return res.send(500, { error: 'Enter Email' });
    } else{
      return res.send(500, { error: 'Enter Password' });
    }
  }
  
  if(!(email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("@citchennai.net"))) return res.send(500, { error: 'Invalid Email' });

  const userFound = await Users.findOne({'email': email});

  if(userFound != null){
    return res.send(500, { error: 'Email already exists' });
  }

  const user = new Users({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`,
    password: `${req.body.password}`,
    contents: []
  });

  const result = await user.save();
  
  return res.send(result);
});

app.post('/user/add/:id', async (req,res) => {
  // const user = new Users({
  //   first_name: `${req.body.user.first_name}`,
  //   last_name: `${req.body.user.last_name}`,
  //   email: `${req.body.user.email}`,
  //   password: `${req.body.user.password}`,
  //   contents: req.body.user.contents
  // });
    const user = await User.findById(req.params.id);
    user.contents.unshift(req.body.content);
    console.log("working");
    const result = await Users.updateOne({ _id: req.params.id}, {contents: user.contents});
    if(result === undefined) return res.send(500, { error: 'Something Went wrong' });
    console.log(result);
    return res.send(user);
  
})

app.post('/user/modify/:id/:index', async (req,res) => {
  // const user = new Users({
  //   first_name: `${req.body.user.first_name}`,
  //   last_name: `${req.body.user.last_name}`,
  //   email: `${req.body.user.email}`,
  //   password: `${req.body.user.password}`,
  //   contents: req.body.user.contents
  // });
    const index = req.params.index;
    const user = await User.findById(req.params.id);
    user.contents[index] = req.body.newContent;
    console.log("working");
    const result = await Users.updateOne({ _id: req.params.id}, {contents: user.contents});
    if(result === undefined) return res.send(500, { error: 'Something Went wrong' });
    console.log(result);
    return res.send(user);
  
})

app.post('/user/del/:id/:index', async (req,res) => {
    const index = req.params.index;
    const user = await User.findById(req.params.id);
    user.contents.splice(index, 1);
    console.log("working");
    const result = await Users.updateOne({ _id: req.params.id}, {contents: user.contents});
    if(result === undefined) return res.send(500, { error: 'Something Went wrong' });
    console.log(result);
    return res.send(user);
  
})

app.post('/user', async (req,res) => {
  console.log(req.body);
  const token = req.body.token;
  const idToSearch = new ObjectId(token);
  console.log(idToSearch);
  let userFound = await Users.findById(idToSearch);
  console.log(userFound);
  userFound = !userFound ? {
    first_name: `Unavailable`,
    last_name: ``,
    email: ``,
    password: ``,
    contents: []
  } : userFound;
  res.send(userFound);
})
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer();
  console.log(`Server is running on port: ${port}`);
});

// const camp = new User({
//   name: ""
// });
// await camp.save();