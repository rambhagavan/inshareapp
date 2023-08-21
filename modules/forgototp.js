const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const fileschema=new Schema({
    Email:{type:String,required:true},
    OTP:{type:String,require:true}
},{timestamps:true}
)
module.exports=mongoose.model("forgototp",fileschema);

