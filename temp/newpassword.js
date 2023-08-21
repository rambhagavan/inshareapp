const router=require("express").Router();
const File=require("../modules/signup");
const bcrypt=require("bcrypt");

router.post("/",async(req,res)=>{
    const {email,password,confirmpassword}=req.body;
    if(password!=confirmpassword){
        res.send("password must be same");
    }
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
  
    const file=await File.findOne({Email:email});

    if(!file){
        res.send("INVALID EMAIL");
    }
  const hashpassword=await bcrypt.hash(password, 10);

 const s=await File.updateOne({Email:email},{Password:hashpassword});

res.send("Password Successfully Updated");

})
module.exports=router;