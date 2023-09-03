const mongoose = require('mongoose');

const all_courses = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("all_courses", all_courses);