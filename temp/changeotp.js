const router=require("express").Router();
const File=require("../modules/forgototp");

router.post("/",async(req,res)=>{
    const {Email,OTP}=req.body;
    const file= await File.findOne({Email:Email});
    if(!file){
        res.send("Invalid Email");
    }
    
    if(file.OTP!=OTP){
        res.send("invalid otp");
    }

 res.render("newpassword",{email:Email});
})
module.exports=router;