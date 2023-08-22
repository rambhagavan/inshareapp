const File=require('./modules/file');
const fs=require('fs');
const connectDB=require('./config/db');
connectDB;
async function fetchData(){
   
    const pastDate=new Date(Date.now()-(60*1000));
    const files=await File.find({createdAt:{$lt:pastDate}});
    if(files.length){
        
        for(const file of files){
         try{
            fs.unlinkSync(file.path);
            await file.remove();
            console.log("your file is deleted");
         }
         catch(err){
  console.log(err);
         }
        }
        console.log('job done');
    }
}
fetchData().then(process.exit)
    