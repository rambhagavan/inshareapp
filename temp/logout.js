const router=require('express').Router();
const {deleteuser}=require('./authentication.js');
router.get('/',(req,res)=>{
   const uid=req.cookies.uid;
   if(!uid){
    return res.redirect('/');
   }
   else{
   deleteuser(uid);
    res.redirect('/');
   }
});
module.exports=router;