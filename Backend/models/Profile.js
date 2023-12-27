const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  headline: {
    type: String,
  },
  biography: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
