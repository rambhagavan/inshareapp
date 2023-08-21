const router=require('express').Router();
const express=require('express');
const cookieParser = require('cookie-parser');
const {getuser}=require('./authentication');
const User=require('../modules/signup');
// const restrictloginonly=require()
const app = express();
app.use(cookieParser());
router.get('/',async(req,res)=>{
    // console.log(req.cookies.uid);
   const uid=req.cookies.uid;
   
   const email=getuser(uid);
   console.log(email);
   if(!email){
    res.redirect('/');
   }
   const user=await User.findOne({Email:email})
    res.render('profile',{users:user});
})
module.exports=router;