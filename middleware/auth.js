const {getuser}=require('../temp/authentication.js');


async function restrictloginonly(req,res,next){
    const uuid=req.cookies.uid;
    if(!uuid){
        return res.redirect('/');
    }
   const user=getuser(uuid);
   if(!user){
    return res.redirect('/');
   }
   req.user=user;
   next();
}
module.exports={restrictloginonly}

