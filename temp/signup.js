const router = require("express").Router();
const OTPDATA = require("../modules/otp");
const SignupFile=require("../modules/signup")
const otpGenerator = require("otp-generator");
router.post("/", async (req, res) => {
  const { Name, email, password, confirmpassword } = req.body;
  let countLowercasechar=0;
  let countNumber=0;
  for(var i=0;i<password.length;i++){
    if(password[i]>='a' &&password[i]<='z'){
      countLowercasechar++;
    }
    else if(password[i]>='0' &&password[i]<='1'){
      countNumber++;
    }
  }
  if(password.length<8 ||countNumber<=0 ||countLowercasechar<=0){
    res.send("Password must contain at least 8 characters including a number and a lowercase letter.")
}

  else if (!Name || !email || !password || !password || !confirmpassword) {
      res.send("all field are required");
  }
  else if (password != confirmpassword) {
    res.send("password and confirmpassword must be same")
  }
  let count=0;
  for(var i=0;i<10;i++){
      if(password[i]>='a' &&password[i]<='z'){
        count++;
      }
  }
  console.log(count);
  const email1 = await SignupFile.findOne({ Email: email });
    await OTPDATA.deleteMany({Email:email})
  if (email1) {
    res.send("user already exists");
  }
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(OTP);
  const file = new OTPDATA({
    Name: Name,
    Email: email,
    Password: password,
    OTP: OTP
  });
  const response=await file.save();
  const otpservices = require("../services/otpservices.js");
  otpservices({
    from:"shivaramyadav12@gmail.com",
    to: email,
    subject: "inshare verfication code",
    text: `${OTP} inshare otp`,
    html: require("../services/otptemplate")({ Name, OTP }),
  });
  res.render("otp", { message1: email });
});
module.exports = router;
