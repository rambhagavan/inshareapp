const router=require("express").Router();
const File=require('../modules/signup');
const forgototp=require("../modules/forgototp")
const otpGenerator = require("otp-generator");
router.post('/',async(req,res)=>{
    const {Email}=req.body;
    const file=await File.findOne({Email:Email});
    if(!file ){
     res.render('forgotpasserr');
    }
    const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const temp=await forgototp.deleteMany({Email:Email});
      const otpfile=new forgototp({
        Email:Email,
        OTP:OTP
      })
      const save=await otpfile.save();
      const Name="inshare";
    const otpservices = require("../services/otpservices.js");
    otpservices({
      from:"shivaramyadav12@gmail.com",
      to: Email,
      subject: "inshare verfication code",
      text: `${OTP} inshare otp`,
      html: require("../services/otptemplate")({ Name, OTP }),
    });
   
res.render("forgototp",{message1:Email});
})

module.exports=router;