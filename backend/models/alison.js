const mongoose = require('mongoose');

const alison = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  category:{type:String, required:false}
});

module.exports = mongoose.model("alison", alison);