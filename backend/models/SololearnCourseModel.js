const mongoose = require('mongoose');

const sololearnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("SololearnCourses", sololearnSchema);

