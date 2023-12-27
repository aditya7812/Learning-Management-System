const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");

const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createSession = async (req, res) => {
  const { courseId } = req.body;
  const courseDetails = await Course.findById(courseId);
  if (!courseDetails) {
    return res.status(400).json({
      success: false,
      message: "Course Not Found",
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: courseDetails.courseName,
            images: [courseDetails.previewImage],
          },
          unit_amount: courseDetails.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      userId: req.userInfo.userId,
      courseId: courseId,
    },
    success_url: "http://localhost:5173/success/{CHECKOUT_SESSION_ID}",
    cancel_url: `http://localhost:5173/course/${courseId}`,
  });
  return res.json({ success: true, id: session.id });
};

exports.enrollStudent = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId
    );
    if (!session) {
      return res.status(400).json({
        success: false,
        message: "An Error Occured",
      });
    }
    const userId = session.metadata.userId;
    const courseId = session.metadata.courseId;

    const alreddyEnrolled = await Course.findOne({ _id: courseId });
    if (alreddyEnrolled.studentsEnrolled.includes(userId)) {
      return res.status(409).json({
        success: false,
        message: "Already Enrolled",
      });
    }

    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { studentsEnrolled: userId },
      },
      { new: true }
    );
    if (!enrolledCourse) {
      return res.status(400).json({
        success: false,
        message: "Course Not Found",
      });
    }
    const courseProgress = await CourseProgress.create({
      courseId: courseId,
      userId: userId,
      completedVideos: [],
    });

    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          enrolledCourses: courseId,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Student Enrolled Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error Occured",
    });
  }
};
