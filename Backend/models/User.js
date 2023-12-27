const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  email: { type: String, required: true },
  password: { type: String, required: true },
  courses: [
    /*Created Courses*/
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  roles: {
    type: [String],
  },
  enrolledCourses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgress",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
