const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path=require('path');
const DB = require("./config/db.js");
const cookieParser = require('cookie-parser')
const {restrictloginonly}=require('./middleware/auth.js');
require("dotenv/config");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const PORT = process.env.PORT || 3000;
DB;
app.use(express.static('./public'));
app.set('views','./views');
app.set('view engine','ejs');


app.get('/',(req,res)=>{
  res.render('login');
})
app.get('/signup',(req,res)=>{
  res.render('signup')
})
app.get('/uploadfile',restrictloginonly,(req,res)=>{
  res.render("ram");
});
app.get('/textarea',(req,res)=>{
  res.render('textarea')
})
app.get('/forgotpassword',(req,res)=>{
  res.render("forgotpass");
})
app.use("/signup",require('./temp/signup.js'));
app.use("/otp",require('./temp/otp.js'));
app.use("/api/files", require("./temp/tempfile.js"));
app.use('/files',require('./temp/show.js'));
app.use('/files/download',require("./temp/download.js"));
app.use('/login',require('./temp/login.js'));
app.use('/dashboard',require("./dashboard/dashboard.js"));
app.use('/api/text',require('./pastebin/getpastelink.js'));
app.use("/text",require("./pastebin/gettextlink.js"));
app.use("/history",restrictloginonly,require("./temp/history.js"));
app.use("/forgot",require("./temp/forgotpass.js"));
app.use("/changepass",require("./temp/changeotp.js"));
app.use("/newpassword",require("./temp/newpassword.js"))
app.use("/profile",restrictloginonly,require("./temp/profile.js"))
app.use("/logout",require("./temp/logout.js"))
app.use('/api/profile',restrictloginonly,require("./temp/profile.js"))
app.use("/api/history",restrictloginonly,require("./temp/history.js"));
app.use("/api/logout",require("./temp/logout.js"))
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

