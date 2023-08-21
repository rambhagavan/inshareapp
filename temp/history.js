const router=require("express").Router();
const {getuser}=require("./authentication")
const File=require('../modules/file');
const Text=require('../modules/textarea')
router.get("/",async (req,res)=>{
const uid=req.cookies.uid;
  if(!uid){
    return res.redirect('/');
  }
const email=getuser(uid);
if(!email){
  return res.redirect('/');
}

const file=await File.find({Email:email});
const text=await Text.find({Email:email});
console.log( file);
console.log(file.length)
const arr = Array.from(file);
const alltext=Array.from(text);
console.log(arr.length);
arr.forEach(url=>{
  console.log(url);
})
  res.render("history",{users:arr,text:alltext});
});
module.exports=router;