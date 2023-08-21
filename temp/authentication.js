const setUserId = new Map();

 function setuser(id,email){
//    const {uuid,email}=req.body;
    setUserId.set(id,email);
}

 function getuser(id){
    console.log(setUserId[id]);
    return setUserId.get(id);
}
function deleteuser(uid){
    setUserId.delete(uid);
}
module.exports={setuser,getuser,deleteuser};

