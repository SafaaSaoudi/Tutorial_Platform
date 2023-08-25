const mongoose = require('mongoose');

const alison = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("alison", alison);