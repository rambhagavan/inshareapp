const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const textschema = new Schema(
    {
        Email:{type:String,required:true},
        uuid: { type: String, required: true },
        text: {type: String,require: true},
        Link:{type:String,required:true}
    },
    { timestamps: true }
  );
module.exports = mongoose.model("Text", textschema);