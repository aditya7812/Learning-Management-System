const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  subSectionName: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  videoName: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  videoDate: {
    type: String,
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
