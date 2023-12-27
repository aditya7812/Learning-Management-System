const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRatingAndReview = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { rating, review, courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled for this course",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed",
      });
    }

    const ratingAndReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });

    const updateCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingAndReview._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and Review added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
    });
  }
};

exports.editRatingAndReview = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { rating, review, courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled for this course",
      });
    }

    const ratingAndReview = await RatingAndReview.findOneAndUpdate(
      { course: courseId, user: userId },
      { rating, review }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and Review Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
    });
  }
};
