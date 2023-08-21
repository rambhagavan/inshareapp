const express=require("express")
const router = require("express").Router();
const multer = require("multer");
const path=require('path')
const Files = require("../modules/file");
const { v4: uuid4 } = require("uuid");
const {getuser}=require('./authentication.js')
const app=express()
app.use(express.json());
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(
      file.originalname)}`;
  
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage,
    limit: { fileSize: 1000000 * 100 } }).single('myfile');
router.post("/",  (req, res) => {
  upload(req,res,async(err)=>{
   
    if(!req.file){
        res.send("all fields is required")
    }
    if(err){
        res.send(`error ${404}`)
    }
    const uid=req.cookies.uid;
    console.log(req.file.originalname);
    if(!uid){
      return res.redirect('/');
    }
    const email=getuser(uid);
    console.log(email);
    if(!email){
      return res.redirect('/');
    }
    const uuid=uuid4();
    const file = new Files({
        Email:email,
        filename: req.file.filename,
        originalname:req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        uuid: uuid,
        Link:`${process.env.APP_BASE_URL}/files/${uuid}`
        });
      const response = await file.save();
      // console.log(req.cookies);
      res.render('getlink',{downloadLink:`${process.env.APP_BASE_URL}/files/${uuid}`,uuid:response.uuid})
  })
});


router.post('/send',async(req,res)=>{
 
  const {uuid,emailto}=req.body;
  console.log(uuid);
 const emailfrom="<inshare@gamil.com>"
let a=emailto;

if(!uuid ||!emailto){
     res.status(422).send({error:'all fields are required'});
  }
  
 
  const file=await Files.findOne({uuid:uuid});
  
 file.sender=emailfrom;
  file.receiver=emailto;
  const response=await file.save();
  const downloadLink=`${process.env.APP_BASE_URL}/files/${file.uuid}`
  const sendMail=require("../services/emailservices");
  sendMail({from:emailfrom,
  to:emailto,
  subject:'inshare file sharing',
  text:`${emailfrom} shared a file with you`,
  html:require("../services/emailtemplate")({
     emailfrom:emailfrom,
     downloadLink:downloadLink,
     size:parseInt(file.size/1000)+'KB',
     expires:'24'
  })
  

})
res.send("email is sent");
})
module.exports = router;
