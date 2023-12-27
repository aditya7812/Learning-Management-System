const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
    },
    courseSubtitle: {
      type: String,
    },

    description: {
      type: String,
    },

    locale: {
      type: String,
    },
    instructionalLevel: {
      type: String,
    },

    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },

    previewImage: {
      type: String,
    },

    promoVideo: {
      type: String,
    },
    learningObjectives: {
      type: [
        {
          objective: String,
        },
      ],
    },
    prerequisites: {
      type: [
        {
          prerequisite: String,
        },
      ],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],

    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    price: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
