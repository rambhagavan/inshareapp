const express=require('express');
const router=require("express").Router();
const File=require('../modules/signup');
const {v4:uuid}=require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const {setuser,getuser}=require('./authentication.js');
const app=express();
app.use(cookieParser());

router.post('/',async (req,res)=>{
    const {Email,Password}=req.body;
    
    const file=await File.findOne({Email:Email});
   
    if(!file){
      res.send('Invalid Email');
    
    }
    else{
        const sessionId=uuid();
    setuser(sessionId,Email);
    res.cookie("uid",sessionId);
    const b=await bcrypt.compare(Password, file.Password);
    if(!b){
        res.send("Invalid Credentials");
    }
    else{
       
        
        res.render("dashboard");
    }
    }
})

module.exports=router;