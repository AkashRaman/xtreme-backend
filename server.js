const express = require("express");
const app = express();
const cors = require("cors");
const Users = require("./model/User");
var morgan = require('morgan');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

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
})

app.post('/user', async (req,res) => {
  console.log(req.body);
  const token= req.body.token;
  const user = await Users.find({ _id:token });
  return res.send(user);
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