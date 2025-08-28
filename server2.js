const express = require("express");
const app = express();
const db2 = require("./db2");
require("dotenv").config();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const person2 = require('./models/person2.js')


const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000; // if no port given in env file, it will use 3000


// Middleware function
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next(); // Move on to the next phase

}
app.use(logRequest);

passport.use(new LocalStrategy(async(userKaNaam,password,done)=>{

  // authentication logic
  try{
    console.log('Received credentials:', userKaNaam, password);
    const user = await person2.findOne({username:userKaNaam})
    if(!user) return done();
  }
  catch(err){

  }
}))
// The above function is used to define the logic and the below one means , we are using that logic.
// Initialize Passport to handle authentication for incoming requests
app.use(passport.initialize());

app.get('/', passport.authenticate('local',{session:false}) ,function(req,res){
  res.send('Welcome to our hotel');
});

const personRoutes2 = require("./routes/personRoutes2.js");
app.use("/person", personRoutes2);

const menuItemRoutes2 = require("./routes/menuItemRoutes2.js");
const { default: next } = require("next");
const router = require("./routes/personRoutes2.js");
app.use("/menuItems", menuItemRoutes2);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
