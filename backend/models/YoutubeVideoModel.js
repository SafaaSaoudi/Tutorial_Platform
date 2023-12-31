const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video_link: { type: String, required: true },
  duration: { type: String, required: true }, 
  upload_date: { type: Date, required: true }, 
});

module.exports = mongoose.model("youtube_videos", videoSchema);
