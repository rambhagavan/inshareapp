const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const useracc = new Schema(
  {
    Name: { type: String, required: true},
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    

  },
  { timestamps: true }
);
module.exports = mongoose.model("User", useracc);
