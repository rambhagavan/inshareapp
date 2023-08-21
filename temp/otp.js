const router=require('express').Router();
const File=require("../modules/otp");
const Signupfile=require("../modules/signup");
const bcrypt = require('bcrypt');
router.post('/',async(req,res)=>{
  console.log(req.body);
 const {Email,OTP}=req.body;
 const file=await File.findOne({Email:Email});
 
 if(OTP!=file.OTP){
    res.send("invalid otp");
 }
 
 File.deleteMany({Email: Email});
 const hashpassword=await bcrypt.hash(file.Password, 10);
  const signupfile=new Signupfile({
    Name:file.Name,
    Email:file.Email,
    Password:hashpassword
  });
  console.log(signupfile);
const response=await signupfile.save();
res.send("Congratulations! 🎉 Your account has been successfully created on our application. ")
});
module.exports=router;