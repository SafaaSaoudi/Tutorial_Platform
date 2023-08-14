const mongoose = require('mongoose');

const w3schoolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("W3schoolTutorials", w3schoolSchema);

