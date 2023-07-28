const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,required :false},
    role:{type:String,enum:["user","admin"],default:"user"}
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
